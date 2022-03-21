import { useCallback, useMemo } from 'react';
import { DataGridProps, GridState } from '@mui/x-data-grid';

export type UseDataGridPersistenceOptions = {
  tableName: string;
};

export type UseDataGridPersistenceResult = {
  dataGridProps: {
    initialState: DataGridProps['initialState'];
    onStateChange: DataGridProps['onStateChange'];
    density: DataGridProps['density'];
  };
};

export const useDataGridPersistence = ({ tableName }: UseDataGridPersistenceOptions): UseDataGridPersistenceResult => {
  const localStorageKey = useMemo(() => {
    return `rr-data-grid-state-${tableName}`;
  }, [tableName]);

  const onStateChange = useCallback(
    (gridState: GridState) => {
      const { density, columns } = gridState;
      const stateSubset = { density, columns };

      // Right now the current spec only calls for a subset of the grid state to be saved
      localStorage.setItem(localStorageKey, JSON.stringify(stateSubset));
    },
    [localStorageKey]
  );

  const initialState = useMemo(() => {
    const persistedStateString = localStorage.getItem(localStorageKey);
    return persistedStateString ? JSON.parse(persistedStateString) : {};
  }, [localStorageKey]);

  // For some reason the GridInitialState type doesn't include a density
  // property at the time of writing so it has to be set separately
  const density = initialState.density?.value || 'standard';
  const dataGridProps = {
    onStateChange,
    initialState,
    density,
  };

  return { dataGridProps };
};
