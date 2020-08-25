import React, { useState, useCallback, useEffect } from "react";

export const Context = React.createContext();

export function DropdownProvider({ children }) {
  const [options, setOptions] = useState([]);
  const [targetId, setTargetId] = useState(null);
  const [cachedId, setCachedId] = useState(null);
  //O cachedId será a última opção do mouse
  const registerOption = useCallback(
    ({
      id,
      opitionDimensios,
      optionCenterX,
      WrappedContent,
      backgroundHeight,
    }) => {
      setOptions((items) => [
        ...items,
        {
          id,
          opitionDimensios,
          optionCenterX,
          WrappedContent,
          backgroundHeight,
        },
      ]);
    },
    [setOptions]
  );

  const updateOptionProps = useCallback(
    (optionId, props) => {
      setOptions((items) =>
        items.map((item) => {
          if (item.id === optionId) {
            item = { ...item, ...props };
          }

          return item;
        })
      );
    },
    [setOptions]
  );

  const getOptionById = useCallback(
    (id) => options.find((item) => item.id === id),
    [options]
  );

  const deleteById = useCallback(
    (id) => {
      setOptions((items) => items.filter((item) => item.id !== id));
    },
    [setOptions]
  );

  useEffect(() => {
    if (targetId != null) setCachedId(targetId);
  }, [targetId]);

  return (
    <Context.Provider
      value={{
        registerOption,
        updateOptionProps,
        getOptionById,
        deleteById,
        options,
        targetId,
        setTargetId,
        cachedId,
        setCachedId,
      }}
    >
      {children}
    </Context.Provider>
  );
}

/**
 * Uso: useCallback utilizado para ser feito como chamada de função que não seja necessário ser
 * sempre computado quando qualquer mudança ocorrer, no caso o '[]' é o elemento que será vigi-
 * ado e caso haja mudança a função é computada mais uma vez.
 *
 * Uso: useEffect é utilizado como um hook de efeito colateral, exemplo, caso o [] sofra alter-
 * ação então será executado alguma coisa, como se fosse um gatilho prestes a ser acionado.
 */
