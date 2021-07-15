import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ShopBrands from "../../components/product/ShopBrands.js";
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
    const {sendDocumentsGetRequest} = this.props
    sendDocumentsGetRequest({
      subModuleName: "category",
      doFilter: true,
      filters: {active: true}
    })
    sendDocumentsGetRequest({
      subModuleName: "brand",
      doFilter: true,
      filters: {active: true}
    })
  }

  render() {
    let {products, brands, categories, activeBrandId, getSortParams, sideSpaceClass} = this.props;

    return (
        <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
          {/* shop search */}
          <ShopSearch handleSearch={(searchQuery) => this.props.handleProductSearch(searchQuery)}/>

          {/* filter by categories */}
          <ShopCategories
              activeId={this.props && this.props.activeId}
              activeBrandId={activeBrandId}
              categories={categories}
              getSortParams={getSortParams}
          />

          <ShopBrands
              activeBrandId={this.props && this.props.activeBrandId}
              brands={brands}
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
  categories: state.categories.productCategories,
  brands: state.brands.productBrands
});

const mapDispatchToProps = dispatch => ({
  sendDocumentsGetRequest: (requestedPayload) => dispatch(requestForGetDocuments(requestedPayload)),
});


export default connect(mapStateToProps,mapDispatchToProps)(ShopSidebar);
