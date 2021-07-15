import PropTypes from "prop-types";
import React, {Fragment, useState, useEffect, useRef} from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedCombos } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ComboShopSidebar from "../../wrappers/product/ComboShopSidebar.js";
import ShopCombos from "../../wrappers/product/ShopCombos.js";
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const DiscoverComboList = ({location, match, products,sendProductsGetRequest}) => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [searchQuery,setSearchQuery ] = useState("")
    const [productCategoryId ,setProductCategoryId ] = useState("")
    const prevCategoryId = usePrevious(productCategoryId)



    const {params: {comboCategoryId} } = match
    const pageLimit = 15;
    const {pathname} = location;

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }


    useEffect(() => {
        setProductCategoryId(comboCategoryId)
        if(prevCategoryId !== productCategoryId){
            getSortParams("category",productCategoryId)
        }
    })

    // useEffect(() => {
    //     if(searchQuery.length > 0){
    //         getSortParams("search",searchQuery)
    //     }
    //     else {
    //         getSortParams("search","")
    //     }
    // },[searchQuery])


    useEffect(() => {
        let sortedProducts = getSortedCombos(products, sortType, sortValue);
        const filterSortedProducts = getSortedCombos(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue ]);


    useEffect(() => {
        const filters = {
            active: true
        }
        sendProductsGetRequest({subModuleName: "combo", doFilter: true, filters: filters})
    },[])

    return (
        <Fragment>
            <MetaTags>
                <title>We are selling combos that fits your needs | sunraystationers.com </title>
                <meta name="description" content="We have one of the best stationery collection for your daily needs. Buy stationery products online without hesitate at best prices." />
            </MetaTags>

            <BreadcrumbsItem to={'/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem className="font-weight-bold" to={pathname}>Combos</BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-0 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ComboShopSidebar
                                    handleComboSearch={(productSearchQuery) => {
                                        setSearchQuery(productSearchQuery)
                                        getSortParams("search",productSearchQuery)
                                    }}
                                    activeId={comboCategoryId}
                                    products={products}
                                    getSortParams={getSortParams}
                                    sideSpaceClass="mr-30"/>
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopCombos layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}

DiscoverComboList.propTypes = {
  location: PropTypes.object,
  sendProductsGetRequest: PropTypes.func,
  products: PropTypes.array,
};

const mapStateToProps = state => ({
    products: state.combos.combos,
});

const mapDispatchToProps = dispatch => ({
    sendProductsGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
});

export default connect(mapStateToProps,mapDispatchToProps)(DiscoverComboList);

