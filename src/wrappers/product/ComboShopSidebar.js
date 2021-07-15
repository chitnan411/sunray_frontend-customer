import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ShopComboCategories from "../../components/product/ShopComboCategories.js";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import requestForGetDocuments from "../../redux/middlewares/getDocumentsUniversal";
import { connect } from "react-redux";

class ShopSidebar extends React.Component {

  componentDidMount() {
    const {sendCategoriesGetRequest} = this.props
    sendCategoriesGetRequest({
      subModuleName: "comboCategory",
      doFilter: true,
      filters: {active: true}
    })
  }

  render() {
    let {products, categories, getSortParams, sideSpaceClass, sendCategoriesGetRequest} = this.props;
    const uniqueCategories = getIndividualCategories(products);
    const uniqueColors = getIndividualColors(products);
    const uniqueSizes = getProductsIndividualSizes(products);
    const uniqueTags = getIndividualTags(products);

    // useEffect(() => {
    //   sendCategoriesGetRequest({
    //     subModuleName: "category",
    //     doFilter: false
    //   })
    // }, [categories])

    return (
        <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
          {/* shop search */}
          <ShopSearch handleSearch={(searchQuery) => this.props.handleComboSearch(searchQuery)}/>

          {/* filter by categories */}
          <ShopComboCategories
              activeId={this.props && this.props.activeId}
              categories={categories}
              getSortParams={getSortParams}
          />

        </div>
    );
  }
}

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string
};


const mapStateToProps = state => ({
  categories: state.comboCategories.comboCategories,
});

const mapDispatchToProps = dispatch => ({
  sendCategoriesGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
});


export default connect(mapStateToProps,mapDispatchToProps)(ShopSidebar);
