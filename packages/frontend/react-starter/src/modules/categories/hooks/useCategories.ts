import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'hooks/useTranslation';
import { pimApi } from 'apis/pim/api';
import { GridSortModel } from '@mui/x-data-grid';

const { useReadAllCategoriesQuery } = pimApi;

/**
 * You'll notice the default page is 1 but we pass "page - 1" to the api.
 * That is because all the logic around pagination is made so that page 0
 * is the first page. However, it wouldn't be very nice to display this
 * to the user... hence why we display 1. But just pass "page - 1" where
 * needed.
 */
export const useCategories = () => {
  const [search, setSearch] = useSearchParams({
    page: '1',
    size: '30',
    sort: '',
  });
  const { i18n } = useTranslation();
  const { data: categories, ...otherProperties } = useReadAllCategoriesQuery({
    lang: i18n.language === 'en-US' ? 'EN_US' : 'EN_CA',
    page: Number(search.get('page')) - 1,
    size: Number(search.get('size')),
    sort: search.get('sort') || '',
    name: search.get('query') || '',
  });

  const handleSearchParamsChange = (field: string, value: string) => {
    const searchCopy: { [key: string]: string } = {
      ...{
        page: search.get('page') || '1',
        size: search.get('size') || '30',
        sort: search.get('sort') || '',
      },
      ...{
        [field]: value,
      },
    };

    // Cleanup
    Object.entries(searchCopy).forEach(([key, value]) => {
      if (!value) {
        delete searchCopy[key];
      }
    });

    setSearch(searchCopy);
  };

  const handlePageChange = (page: number) => {
    handleSearchParamsChange('page', `${page + 1}`);
  };

  const handleSizeChange = (size: number) => {
    handleSearchParamsChange('size', `${size + 1}`);
  };

  const handleSortModelChange = (newModel: GridSortModel) => {
    handleSearchParamsChange('sort', newModel.length > 0 ? `${newModel[0].field},${newModel[0].sort}` : '');
  };

  const handleQueryChange = (query: string) => {
    handleSearchParamsChange('query', query);
  };

  return {
    categories,
    page: Number(search.get('page')) - 1,
    size: Number(search.get('size')),
    searchQuery: search.get('query'),
    onPageChange: handlePageChange,
    onSizeChange: handleSizeChange,
    onSortModelChange: handleSortModelChange,
    onSearchQueryChange: handleQueryChange,
    ...otherProperties,
  };
};
