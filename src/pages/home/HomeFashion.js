import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import SectionTitle from "../../components/section-title/SectionTitle.js";
import LayoutOne from "../../layouts/LayoutOne";
import BannerFourteen from "../../wrappers/banner/BannerFourteen.js";
import BlogFeaturedThree from "../../wrappers/blog-featured/BlogFeaturedThree.js";
import CategoryFourSlider from "../../wrappers/category/CategoryFourSlider.js";
import CategoryThreeSlider from "../../wrappers/category/CategoryThreeSlider.js";
import SSHomeBrandSlider from "../../wrappers/category/ssHomeBrandSlider.js";
import FeatureIconThree from "../../wrappers/feature-icon/FeatureIconThree.js";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import HeroSliderTwelve from "../../wrappers/hero-slider/HeroSliderTwelve.js";
import TabProduct from "../../wrappers/product/SSLatestProductsTab.js";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import TabProductEleven from "../../wrappers/product/TabProductEleven.js";

const HomeFashion = () => {
    return (
        <Fragment>
            <MetaTags>
                <title>sunraystationers.com - Ask for anything you want, from the moon to Sunray we sell everything!</title>
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

                <BannerFourteen spaceTopClass="pt-95" spaceBottomClass="pb-70" />
                {/* tab product */}


                {/*Shop by category slider*/}
                <SectionTitle titleText="Shop by Category" positionClass="text-center" />
                <CategoryThreeSlider spaceTopClass="pt-70" spaceBottomClass="pb-95" />


                {/*Shop by brands slider*/}
                <SectionTitle titleText="Shop by Brands" positionClass="text-center" />
                <SSHomeBrandSlider spaceTopClass="pt-70" spaceBottomClass="pb-95" />
                {/*<CategoryFourSlider spaceTopClass="pt-70" spaceBottomClass="pb-95" />*/}

                <TabProductEleven
                    category="kids"
                    spaceTopClass="pt-100"
                    spaceBottomClass="pb-100"
                    sectionTitle="Featured Products"
                    bgColorClass="bg-gray-3"
                />

                {/* tab product */}
                <TabProduct spaceTopClass="pt-90" spaceBottomClass="pb-60" category="fashion" />

                {/* featured icon */}
                <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

                {/* blog featured */}
                <BlogFeatured spaceBottomClass="pb-55" />

                {/* blog featured */}
                {/*<BlogFeaturedThree spaceTopClass="pt-70" spaceBottomClass="pb-70" />*/}

            </LayoutOne>
        </Fragment>
    );
};

export default HomeFashion;
