import { useRef, ChangeEvent } from 'react';
import { useTranslation } from 'hooks/useTranslation';
import { Box, debounce } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

export type GridToolbarSearchProps = {
  onClearSearch: () => void;
  onSearchQueryChange: (value: string) => void;
  searchQuery?: string;
};

export function GridToolbarSearch({ onClearSearch, onSearchQueryChange, searchQuery = '' }: GridToolbarSearchProps) {
  const { t } = useTranslation('components.GridToolbarSearch');
  const searchField = useRef<HTMLInputElement>(null);

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => onSearchQueryChange(event.target.value || '');
  const handleClearSearch = () => {
    if (searchField && searchField.current) {
      searchField.current.value = '';
    }

    onClearSearch();
  };

  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant='standard'
        defaultValue={searchQuery || ''}
        onChange={debounce(handleSearchQueryChange, 600)}
        placeholder={t('placeholder')}
        inputRef={searchField}
        InputProps={{
          startAdornment: <SearchIcon fontSize='small' />,
          endAdornment: (
            <IconButton title={t('clear')} aria-label='Clear' size='small' style={{ visibility: searchQuery ? 'visible' : 'hidden' }} onClick={handleClearSearch}>
              <ClearIcon fontSize='small' />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: 'auto',
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          '& .MuiSvgIcon-root': {
            mr: 0.5,
          },
          '& .MuiInput-underline:before': {
            borderBottom: 1,
            borderColor: 'divider',
          },
        }}
      />
    </Box>
  );
}
