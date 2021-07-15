import axios from "axios"
import React, {Fragment} from "react";
import MetaTags from "react-meta-tags";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {ParallaxBanner} from "react-scroll-parallax/cjs";
import {Button, Col} from "reactstrap";
import HomeBgImage from "../../assets/images/bg/school-supplies-stationery-blue-back-school-concept-with-copy-space-text-flat-lay.jpg"
import SectionTitle from "../../components/section-title/SectionTitle.js";
import LayoutOne from "../../layouts/LayoutOne";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal.js";
import {apiRootUrl, ssClientAuthCookieKey, ssClientAuthFlagCookieKey} from "../../utils/constants";
import Cookies from "js-cookie";
import CategoryThreeSlider from "../../wrappers/category/CategoryThreeSlider.js";
import SSHomeBrandSlider from "../../wrappers/category/ssHomeBrandSlider.js";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import HeroSliderTwelve from "../../wrappers/hero-slider/HeroSliderTwelve.js";
import SSHomeCrazyDealTab from "../../wrappers/product/SSHomeCrazyDealTab.js";
import SSHomeFeaturedCombosTab from "../../wrappers/product/SSHomeFeaturedCombosTab.js";
import SSHomeFeaturedProductsTab from "../../wrappers/product/SSHomeFeaturedProductsTab.js";
import SSLatestProductsTab from "../../wrappers/product/SSLatestProductsTab.js";
import TabProductEleven from "../../wrappers/product/TabProductEleven.js";

class SSHomePage extends React.Component {

    state = {
        featuredProducts: null,
        featuredCombos: null,
        isCrazyDealOn: false,
    }

    getFeaturedItems = async (type,stateType) => {
        await axios.get(`${apiRootUrl}/v2/admin/${type}?featured=true&active=true`, {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
            .then((response) => {
                if (response.data) {
                    if (response.data.confirmation) {
                        if (response.data.confirmation.message === "There is no record") {
                            this.setState({
                                [stateType]: 0
                            })
                        }
                    }
                    if (response.data.card) {
                        this.setState({
                            [stateType]: response.data && response.data.card && response.data.card.data && response.data.card.data.length
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error, "error error error error error error error error ")
            })
    }

    getCrazyDeals = async () => {
        await axios.get(`${apiRootUrl}/v2/admin/product?crazyDeal=true`, {withCredentials: true, headers: {Authorization: `Bearer ${Cookies.get(ssClientAuthCookieKey)}`}})
            .then((response) => {
                if (response.data) {
                    if (response.data.confirmation) {
                        if (response.data.confirmation.message === "There is no record") {
                            this.setState({
                                isCrazyDealOn: false
                            })
                        }
                    }
                    if (response.data.card) {
                        if (response.data.card.data) {
                            if((response.data && response.data.card && response.data.card.data && response.data.card.data.length) > 0){
                                this.setState({
                                    isCrazyDealOn: true
                                })
                            }
                        }
                    }
                }
            })
            .catch((error) => {
            })
    }

    async componentDidMount() {

        const {sendProductsGetRequest} = this.props

        const filters = {
            active: true
        }
        await sendProductsGetRequest({subModuleName: "product", doFilter: true, filters: filters})

        await this.getFeaturedItems("product", "featuredProducts")
        await this.getFeaturedItems("combo","featuredCombos")
        await this.getCrazyDeals()

    }


    render() {
        const {featuredCombos, isCrazyDealOn, featuredProducts} = this.state
        return (
            <Fragment>
                <MetaTags>
                    <title>Sunray Stationers | Best online stationery providers | Ask for anything you want, from the moon to sunray we sell everything!</title>
                    <meta
                        name="description"
                        content="Buy stationery without going anywhere at best prices. We have all your needs. Order online all your stationery need by one click"
                    />
                </MetaTags>
                <LayoutOne
                    headerTop="visible"
                    headerContainerClass="container-fluid"
                    headerPaddingClass="header-padding-1"
                >

                    <HeroSliderTwelve/>


                    {isCrazyDealOn &&
                    <SSHomeCrazyDealTab
                        category="kids"
                        spaceTopClass="pt-40"
                        spaceBottomClass="pb-40"
                        sectionTitle="Crazy Deals"
                        bgColorClass="bg-white"
                    />
                    }


                    {
                        featuredProducts > 0 &&
                        <SSHomeFeaturedProductsTab
                            category="kids"
                            spaceTopClass="pt-40"

                            sectionTitle="Featured Products"
                            bgColorClass="bg-white"
                        />
                    }


                    {/*Shop by category slider*/}
                    <SectionTitle spaceClass="pt-5" titleText="Shop by Category" positionClass="text-center"/>
                    <CategoryThreeSlider spaceTopClass="pt-70" spaceBottomClass="pb-95"/>

                    {
                        featuredCombos > 0 &&
                        <SSHomeFeaturedCombosTab
                            category="kids"
                            spaceTopClass="pt-40"
                            spaceBottomClass="pb-100"
                            sectionTitle="Featured Combos"
                            bgColorClass="bg-white"
                        />
                    }
                    <ParallaxBanner
                        className="your-class"
                        layers={[
                            {
                                image: HomeBgImage,
                                amount: 0.1,
                            }
                        ]}
                        style={{
                            height: '500px',
                        }}
                    >
                        <div className="stationery2-parallax">
                            <div className="first-heading">Didn't find the product here?</div>
                            <h1 className="ss-home-pr-title">Suggest it & we will Source it for you</h1>
                            <a href="/contact" className="btn btn-secondary">Let Us Know</a>
                        </div>
                    </ParallaxBanner>


                    {/*latest products*/}
                    <SSLatestProductsTab spaceTopClass="pt-30" spaceBottomClass="pb-5" category="fashion"/>


                    {/*Shop by brands slider*/}
                    <SectionTitle spaceClass="pt-2" titleText="Shop by Brands" positionClass="text-center"/>
                    <SSHomeBrandSlider spaceTopClass="pt-70" spaceBottomClass="pb-95"/>
                    {/*<CategoryFourSlider spaceTopClass="pt-70" spaceBottomClass="pb-95" />*/}


                    <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-90"/>


                    {/* <BannerFourteen  spaceBottomClass="pb-90" /> */}

                    <div style={{
                        backgroundImage: "url(https://www.stationeryhut.in/image/catalog/stationery2/bg-parallax.jpg)",
                        backgroundPosition: "top center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "scroll"
                    }}>

                        <div className="container">
                            <div className="row">
                                <Col sm={12}>
                                    <div className="stationery2-parallax2">
                                        <div className="first-heading">Shop by Brands!</div>
                                        <div className="second-heading">On sale now!</div>
                                        <Button href="stationerybrands">View All Brands</Button>
                                    </div>
                                </Col>
                            </div>
                        </div>

                    </div>


                </LayoutOne>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products.products,
});

const mapDispatchToProps = dispatch => ({
    sendProductsGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SSHomePage));
