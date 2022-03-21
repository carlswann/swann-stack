import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Divider } from '@mui/material';
import { Button } from 'components/ui/extended/Button';
import { GridToolbarSearch, GridToolbarSearchProps } from 'components/GridToolbarSearch';
import { GridToolbarRefreshButton, GridToolbarRefreshButtonProps } from 'components/GridToolbarRefreshButton';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector } from '@mui/x-data-grid';

export type GridToolbarProps = {
  createButton?: {
    label: string;
    onClick: () => void;
  };
  onRefresh: GridToolbarRefreshButtonProps['onRefresh'];
  onClearSearch?: GridToolbarSearchProps['onClearSearch'];
  onSearchQueryChange?: GridToolbarSearchProps['onSearchQueryChange'];
  searchQuery?: GridToolbarSearchProps['searchQuery'];
};

export const GridToolbar: React.FC<GridToolbarProps> = ({ createButton, onRefresh, onClearSearch, onSearchQueryChange, searchQuery }) => {
  const hasCreateButton = !!createButton;

  return (
    <>
      <Box mb={2}>
        <GridToolbarContainer>
          <Box>
            {onClearSearch && onSearchQueryChange && <GridToolbarSearch onClearSearch={onClearSearch} onSearchQueryChange={onSearchQueryChange} searchQuery={searchQuery} />}
          </Box>
          <Box width='100%' display='flex' justifyContent='right' alignItems='center'>
            <Box>
              <GridToolbarColumnsButton variant='contained' />
            </Box>

            <Box ml={2}>
              <GridToolbarDensitySelector variant='contained' />
            </Box>

            <Box ml={2}>
              <GridToolbarRefreshButton onRefresh={onRefresh} />
            </Box>

            {hasCreateButton && (
              <Box ml={2}>
                <Button onClick={createButton.onClick} startIcon={<AddIcon />} variant='contained' size='small'>
                  {createButton.label}
                </Button>
              </Box>
            )}
          </Box>
        </GridToolbarContainer>
      </Box>
      <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />
    </>
  );
};
