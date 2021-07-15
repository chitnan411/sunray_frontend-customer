import axios from "axios";
import PropTypes from "prop-types";
import React, {Fragment, useEffect} from "react";
import {BreadcrumbItem} from "react-bootstrap";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import noProductFound from "../../assets/images/4.svg";
import LayoutOne from "../../layouts/LayoutOne";
import {clearComboRequestState} from "../../redux/actions/combos/ssCombosActions.js";
import {cleanGetProductRequestState} from "../../redux/actions/products/ssProductsActions.js";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";
import {isObjectEmpty} from "../../utils/commonUtils.js";
import {apiRootUrl} from "../../utils/constants.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ComboDescriptionTab from "../../wrappers/product/ComboDescriptionTab.js";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import ComboImageDescription from "../../wrappers/product/ComboImageDescription"

class Product extends React.Component {

    componentDidMount() {
        let {sendSingleProductGetRequest, history, combo, match, key} = this.props;
        if(match.params.id !== null){
            const filters = {comboId: match.params && match.params.id}
            sendSingleProductGetRequest({
                subModuleName: "combo",
                doFilter: true,
                isSingle: true,
                filters: filters
            })
        }
        if((match && match.params && match.params.id) == null){
            history.push("/")
        }
    }

    componentWillUnmount() {
        const {clearComboRequestState} = this.props;
        clearComboRequestState()
    }


    render() {
        let {location, combo, singleComboState, match, key} = this.props;

        const {
            getSingleComboRequestPending,
            getSingleComboSuccess,
            getSingleComboFailure,
            getSingleComboFailurePayload,
            comboDocument,
        } = singleComboState

        const {pathname} = location;

        if(getSingleComboRequestPending){
            return (<div className="flone-preloader-wrapper">
                <div id="circle2" />
            </div>)
        }
        else {
            if(isObjectEmpty(comboDocument)){
                return(
                    <div className="w-100 text-center">
                        <img style={{
                            height: "139px",
                            marginTop: "15rem"
                        }} src={noProductFound} height={200} width={300}/>
                        <h3 className="text-dark pt-4 mb-5 font-weight-bold text-center">Combo Not Found.</h3>
                    </div>
                )
            }
            else {
                return (
                    <Fragment>
                        <MetaTags>
                            <title>{combo && combo.metaTitle}</title>
                            <meta
                                name="description"
                                content={combo && combo.metaDescription}
                            />
                        </MetaTags>


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
                                    <Link to={`/combos/${combo && combo.comboCategory && combo.comboCategory._id}`}>{combo && combo.comboCategory && combo.comboCategory.comboCategoryName}</Link>
                                    <span>/</span>
                                </span>
                                    <span>
                                    <Link className="font-weight-bold" to={`/combo/${combo && combo._id}`}>{combo && combo.comboName}</Link>
                                </span>
                            </span>
                                    </div>
                                </div>
                            </div>

                            {/* combo description with image */}
                            <ComboImageDescription
                                // spaceTopClass="pt-100"
                                galleryType="leftThumb"
                                spaceBottomClass="pb-100"
                                combo={combo}
                            />

                            {/*combo description tab */}
                            <ComboDescriptionTab
                                spaceBottomClass="pb-90"
                                combo={combo}
                                comboFullDesc={combo && combo.description}
                            />

                            {/* related combo slider */}
                            <RelatedProductSlider
                                spaceBottomClass="pb-95"
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
    combo: PropTypes.object,
    sendSingleProductGetRequest: PropTypes.func
};


const mapStateToProps = (state, ownProps) => {
    return {
        combo: state.singleCombo.comboDocument,
        singleComboState: state.singleCombo,
    };
};

const mapDispatchToProps = dispatch => ({
    sendSingleProductGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
    clearComboRequestState: () => dispatch(clearComboRequestState())
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Product));

