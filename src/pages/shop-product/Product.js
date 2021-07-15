import PropTypes from "prop-types";
import React, {Fragment, useEffect} from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import {Link, Redirect, withRouter} from "react-router-dom";
import LayoutOne from "../../layouts/LayoutOne";
import {cleanGetProductRequestState} from "../../redux/actions/products/ssProductsActions.js";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";
import {isObjectEmpty} from "../../utils/commonUtils.js";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import noProductFound from "../../assets/images/4.svg"

class Product extends React.Component {

    async componentDidMount() {
        let {sendSingleProductGetRequest, sendProductsGetRequest, history, product, match, products, key} = this.props;
        if(match.params.id !== null){
            const filters = {productId: match.params && match.params.id}
            sendSingleProductGetRequest({
                subModuleName: "product",
                doFilter: true,
                isSingle: true,
                filters: filters
            })
        }
        if(products){
            if(products.length === 0){
                const filters = {
                    active: true
                }
                await sendProductsGetRequest({subModuleName: "product", doFilter: true, filters: filters})
            }
        }
        if((match && match.params && match.params.id) == null){
            history.push("/")
        }
    }

    componentWillUnmount() {
        const {cleanGetProductRequestState} = this.props
        cleanGetProductRequestState()
    }


    render() {
        let {location, product, match, singleProductState, key} = this.props;
        const {
            getSingleProductRequestPending,
            getSingleProductSuccess,
            getSingleProductFailure,
            getSingleProductFailurePayload,
            productDocument
        } = singleProductState
        const {pathname} = location

        if(getSingleProductRequestPending){
            return (<div className="flone-preloader-wrapper">
                <div id="circle2" />
            </div>)
        }
        // if(getSingleProductSuccess && productDocument){
        else {
            if(isObjectEmpty(productDocument)){
                return(
                    <div className="w-100 text-center">
                        <img style={{
                            height: "139px",
                            marginTop: "15rem"
                        }} src={noProductFound} height={200} width={300}/>
                        <h3 className="text-dark pt-4 mb-5 font-weight-bold text-center">Product Not Found.</h3>
                    </div>
                )
            }
            else {
                return (
                    <Fragment>
                        <MetaTags>
                            <title>{product && product.metaTitle}</title>
                            <meta
                                name="description"
                                content={product && product.metaDescription}
                            />
                        </MetaTags>

                        <BreadcrumbsItem to={"/"}>Home</BreadcrumbsItem>
                        <BreadcrumbsItem to={`/products/${product && product.parentCategory && product.parentCategory._id}`}>{product && product.parentCategory && product.parentCategory.categoryName}</BreadcrumbsItem>
                        <BreadcrumbsItem className="font-weight-bold" to={`/product/${product && product._id}`}>{product && product.productName}</BreadcrumbsItem>

                        <LayoutOne headerTop="visible">
                            {/* breadcrumb */}
                            <div className="breadcrumb-area pt-35 pb-35 ">
                                <div className="container">
                                    <div className="breadcrumb-content ">
                            <span>
                                <span>
                                    <Link to={"/"}>Home</Link>
                                    <span>/</span>
                                </span>
                                <span>
                                    <Link to={`/products/${product && product.parentCategory && product.parentCategory._id}`}>{product && product.parentCategory && product.parentCategory.categoryName}</Link>
                                    <span>/</span>
                                </span>
                                    <span>
                                    <Link className="font-weight-bold" to={`/product/${product && product._id}`}>{product && product.productName}</Link>
                                </span>
                            </span>
                                    </div>
                                </div>
                            </div>

                            {/* product description with image */}
                            <ProductImageDescription
                                // spaceTopClass="pt-100"
                                galleryType="leftThumb"
                                spaceBottomClass="pb-100"
                                product={product}
                            />

                            {/* product description tab */}
                            <ProductDescriptionTab
                                spaceBottomClass="pb-90"
                                product={product}
                                productFullDesc={product && product.description}
                            />

                            {/* related product slider */}
                            <RelatedProductSlider
                                productId={product && product._id}
                                spaceBottomClass="pb-95"
                                category={product && product.category}
                            />
                        </LayoutOne>
                    </Fragment>
                );
            }
        }
    }
}

Product.propTypes = {
    location: PropTypes.object,
    product: PropTypes.object,
    sendSingleProductGetRequest: PropTypes.func
};


const mapStateToProps = (state, ownProps) => {
    return {
        product: state.singleProduct.productDocument,
        singleProductState: state.singleProduct,
        products: state.products.products
    };
};

const mapDispatchToProps = dispatch => ({
    sendSingleProductGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
    sendProductsGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
    cleanGetProductRequestState: () => dispatch(cleanGetProductRequestState())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Product));

