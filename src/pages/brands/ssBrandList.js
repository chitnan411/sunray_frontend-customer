import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import {Button, Col} from "reactstrap";
import SectionTitle from "../../components/section-title/SectionTitle.js";
import LayoutOne from "../../layouts/LayoutOne";
import BannerFourteen from "../../wrappers/banner/BannerFourteen.js";
import CategoryThreeSlider from "../../wrappers/category/CategoryThreeSlider.js";
import SSHomeBrandSlider from "../../wrappers/category/ssHomeBrandSlider.js";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import HeroSliderTwelve from "../../wrappers/hero-slider/HeroSliderTwelve.js";
import TabProduct from "../../wrappers/product/SSLatestProductsTab.js";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import TabProductEleven from "../../wrappers/product/TabProductEleven.js";
import TabProductNine from "../../wrappers/product/TabProductNine.js";

const ssBrandsListPage = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>
                    Our Brands - sunraystationers.com
                </title>
                <meta
                    name="description"
                    content="sunraystationers.com - Ask for anything you want, from the moon to Sunray- we sell everything!."
                />
            </MetaTags>
            <LayoutOne
                headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-1"
            >

                <HeroSliderTwelve />

                {/* hero slider */}
                {/*<HeroSliderOne />*/}

                {/*<TabProductNine*/}
                {/*    category="fashion"*/}
                {/*    spaceBottomClass="pb-100"*/}
                {/*    spaceTopClass="pt-100"*/}
                {/*/>*/}

                {/*Shop by category slider*/}
                <SectionTitle titleText="Shop by Category" positionClass="text-center" />
                <CategoryThreeSlider spaceTopClass="pt-70" spaceBottomClass="pb-95" />



                <TabProductEleven
                    category="kids"
                    spaceTopClass="pt-40"
                    spaceBottomClass="pb-100"
                    sectionTitle="Featured Items"
                    bgColorClass="bg-white"
                />



                {/*Shop by brands slider*/}
                <SectionTitle titleText="Shop by Brands" positionClass="text-center" />
                <SSHomeBrandSlider spaceTopClass="pt-70" spaceBottomClass="pb-95" />
                {/*<CategoryFourSlider spaceTopClass="pt-70" spaceBottomClass="pb-95" />*/}


                <TabProduct spaceTopClass="pt-90" spaceBottomClass="pb-60" category="fashion" />


                <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-90" />

                {/* featured icon */}

                <BannerFourteen  spaceBottomClass="pb-90" />

                <div style={{backgroundImage: "url(https://www.stationeryhut.in/image/catalog/stationery2/bg-parallax.jpg)",
                    backgroundPosition: "top center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "scroll"}} >

                    <div className="container">
                        <div className="row">
                            <Col sm={12}>
                                <div className="stationery2-parallax2">
                                    <div className="first-heading">Shop by Brands!</div>
                                    <div className="second-heading">On sale now!</div>
                                    <Button href="stationerybrands" >View All Brands</Button>
                                </div>
                            </Col>
                        </div>
                    </div>

                </div>


            </LayoutOne>
        </Fragment>
    );
};

export default ssBrandsListPage;