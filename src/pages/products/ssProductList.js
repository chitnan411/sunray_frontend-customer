import PropTypes from "prop-types";
import React, {Fragment, useState, useEffect, useRef} from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import {connect, useDispatch} from 'react-redux';
import {useLocation, withRouter} from "react-router";
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";
import {isNotEmptyObject} from "../../utils/commonUtils.js";
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const DiscoverProductList = ({location,match, products,sendProductsGetRequest, categories}) => {
    const [layout, setLayout] = useState('grid two-column');
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
    const [productBrandId ,setProductBrandId ] = useState("")
    const prevCategoryId = usePrevious(productCategoryId)
    const prevBrandId = usePrevious(productBrandId)
    const singleCategory = categories.filter(category => category._id === productCategoryId)[0]
    const query = useQuery();
    let brandId = query.get("brand")


    const {params: {categoryId} } = match
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
        setProductCategoryId(categoryId)
        setProductBrandId(brandId)
        console.log("brandId brandId brandId brandId brandId brandId",brandId)
        if(prevCategoryId !== productCategoryId){
            getSortParams("category",productCategoryId)
        }
        if(prevBrandId !== productBrandId){
            getSortParams("brand",productBrandId)
        }
    })

    useEffect(() => {
        console.log("product state ==> productCategoryId",productCategoryId)
        console.log("product state ==> productBrandId",productBrandId)
    },[productBrandId,productCategoryId])


    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
        console.log("product state ==> sortedProducts",sortedProducts)
        console.log("product state ==> filterSortedProducts",filterSortedProducts)
        console.log("product state ==> currentData",currentData)
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue ]);


    useEffect(() => {
        const filters = {
            active: true
        }
        sendProductsGetRequest({subModuleName: "product", doFilter: true, filters: filters})
    },[])


    return (
        <Fragment>
            <MetaTags>
                <title>Our Products collection | sunraystationers.com </title>
                <meta name="description" content="We have one of the best stationery collection for your daily needs. Buy stationery products online without hesitate at best prices." />
            </MetaTags>

            <BreadcrumbsItem to={'/'}>Home</BreadcrumbsItem>
            <BreadcrumbsItem className="font-weight-bold" to={pathname}>Products</BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb />

                <div className="shop-area pt-0 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar
                                    handleProductSearch={(productSearchQuery) => {
                                        setSearchQuery(productSearchQuery)
                                        getSortParams("search",productSearchQuery)
                                    }}
                                    activeId={categoryId}
                                    activeBrandId={brandId}
                                    products={products}
                                    getSortParams={getSortParams}
                                    sideSpaceClass="mr-30"/>
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}

                                { isNotEmptyObject(singleCategory) &&
                                    <>
                                        <div>
                                            <div>
                                                <h3 style={{ fontWeight: "200 !important", fontSize: "35px !important" }} className="text-dark text-left ">
                                                    {singleCategory && singleCategory.categoryName}
                                                </h3>
                                                <p>{singleCategory && singleCategory.description}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                    </>
                                }

                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

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

DiscoverProductList.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array,
    sendProductsGetRequest: PropTypes.func
}

const mapStateToProps = state => ({
    products: state.products.products,
    categories: state.categories.productCategories,
    brands: state.brands.productBrands
});

const mapDispatchToProps = dispatch => ({
    sendProductsGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
});


export default connect(mapStateToProps,mapDispatchToProps)(DiscoverProductList);
