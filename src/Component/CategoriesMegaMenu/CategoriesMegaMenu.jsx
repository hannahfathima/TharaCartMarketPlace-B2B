import { useEffect, useState } from 'react';
import useCategories from '../../redux/hooks/HomePageHooks/useCategories';
import './CategoriesMegaMenu.scss';

const CategoriesMegaMenu = () => {
  const [mainCategory, setMainCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const { categories, status: categoriesStatus, error: categoriesError } = useCategories();

  useEffect(() => {
    const filteredCategories = categories.filter((data) => data.id === data.parentCategory);
    setMainCategory(filteredCategories);
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
  };

  const filteredSubCategories = categories.filter(
    (sub) => sub.parentCategory === selectedCategory && sub.id !== selectedCategory
  );

  const filteredSubSubCategories = categories.filter(
    (subsub) => subsub.parentCategory === selectedSubCategory && subsub.id !== selectedSubCategory
  );

  if (categoriesStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (categoriesStatus === 'failed') {
    return <div>Error: {`Error Fetching Category Data${categoriesError}`}</div>;
  }

  return (
    <div className='MegaMenuMainWrapper'>
      <div className="overLay">
        <div className="mega-menu">
          <table>
            <tbody>
              <tr>
                {/* Main Categories Column */}
                <td>
                  <div className="column-wrapper main-categories-list">
                    {mainCategory.map((data, index) => (
                      <div
                        className={`items-wrapp ${selectedCategory === data.id ? 'activeCategory' : ''}`}
                        key={index}
                        onClick={() => handleCategoryClick(data.id)}
                      >
                        <span className='items'>{data.name}</span>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Subcategories Column */}
                {selectedCategory && (
                  <td>
                    <div className="column-wrapper main-categories-list">
                      {filteredSubCategories.length > 0 ? (
                        filteredSubCategories.map((sub, index) => (
                          <div
                            className={`items-wrapp ${selectedSubCategory === sub.id ? 'activeCategory' : ''}`}
                            key={index}
                            onClick={() => handleSubCategoryClick(sub.id)}
                          >
                            <span className='items'>{sub.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="items-wrapp no-category">
                          <span className='items'>No Category</span>
                        </div>
                      )}
                    </div>
                  </td>
                )}

                {/* Sub-Subcategories Column */}
                {selectedSubCategory && (
                  <td>
                    <div className="column-wrapper main-categories-list">
                      {filteredSubSubCategories.length > 0 ? (
                        filteredSubSubCategories.map((subsub, index) => (
                          <div className='items-wrapp' key={index}>
                            <span className="items">{subsub.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="items-wrapp no-category">
                          <span className='items'>No Category</span>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesMegaMenu;
