let PRODUCTS = [];
const RESET_VALUES = {
  id: '',
  category: '',
  price: '$',
  name: ''
};

class ProductAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: RESET_VALUES
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    form.price.value = form.price.value.substring(1);
    const productnew = {
      name: form.productname.value,
      category: form.productcat.value,
      price: form.price.value,
      url: form.url.value
    };
    this.props.createProducts(productnew);
    form.productname.value = '';
    this.setState(prevState => {
      prevState.product.price = '$';
      return {
        product: prevState.product
      };
    });
    form.productcat.value = '';
    form.url.value = ''; //form.owner.value = ""; form.title.value = "";
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState => {
      prevState.product.price = value;
      return {
        product: prevState.product
      };
    });
  }

  render() {
    const paddingStyle = {
      margin: 10
    };
    const paddingStyle2 = {
      margin: 80
    };
    return React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, React.createElement("label", {
      htmlFor: "productname",
      style: paddingStyle
    }, "Product Name"), "\xA0", React.createElement("label", {
      htmlFor: "productcat",
      style: paddingStyle2
    }, "Product Category"), React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "productname",
      style: paddingStyle
    }), "\xA0", React.createElement("select", {
      id: "productcat",
      style: paddingStyle
    }, "\xA0", React.createElement("option", {
      value: "Shirts"
    }, "Shirts"), React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "Accessories"
    }, "Accessories")), React.createElement("br", null), React.createElement("label", {
      htmlFor: "price",
      style: paddingStyle
    }, "Price Per Unit"), "\xA0", React.createElement("label", {
      htmlFor: "url",
      style: paddingStyle2
    }, "Image URL"), "\xA0", React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "price",
      onChange: this.handleChange,
      value: RESET_VALUES.price,
      style: paddingStyle
    }), "\xA0", React.createElement("input", {
      type: "text",
      name: "url",
      style: paddingStyle
    }), ";", React.createElement("br", null), React.createElement("br", null), React.createElement("button", null, "Add Product"));
  }

}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rows = []; //  let productArray = this.props.productArray;

    if (this.props.productArray && Array.isArray(this.props.productArray)) {
      this.props.productArray.forEach(product => {
        rows.push(React.createElement(ProductRow, {
          key: product.id,
          productid: product.id,
          productname: product.name,
          productcat: product.category,
          productprice: '$' + product.price,
          producturl: product.url
        }));
      });
    }

    const borderedStyle = {
      border: "1px solid silver",
      padding: 4
    };
    return React.createElement("table", {
      style: {
        borderCollapse: "collapse"
      }
    }, React.createElement("thead", {
      className: "thead-dark"
    }, React.createElement("tr", null, React.createElement("th", {
      style: borderedStyle
    }, "Name"), React.createElement("th", {
      style: borderedStyle
    }, "Category"), React.createElement("th", {
      style: borderedStyle
    }, "Price"), React.createElement("th", {
      style: borderedStyle
    }, "Image"), React.createElement("th", null, "\xA0"))), React.createElement("tbody", null, rows));
  }

}

class ProductRow extends React.Component {
  constructor() {
    super(); //    this.handleClick = this.handleClick.bind(this);
  } // handleClick(e){
  //     return window.open($this.props.producturl,'_blank');
  // }


  render() {
    const borderedStyle = {
      border: "1px solid silver",
      padding: 4
    };
    return React.createElement("tr", null, React.createElement("td", {
      style: borderedStyle
    }, this.props.productname), React.createElement("td", {
      style: borderedStyle
    }, this.props.productcat), React.createElement("td", {
      style: borderedStyle
    }, this.props.productprice), React.createElement("td", {
      style: borderedStyle
    }, React.createElement("a", {
      href: this.props.producturl,
      target: "_blank"
    }, "View")));
  }

}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      productArray: []
    };
    this.createProducts = this.createProducts.bind(this);
  } // componentDidMount() { 
  //     this.setState({
  //         productArray:[{}]
  //     }) }


  createProducts(product) {
    product.id = new Date().getTime();
    const existingLists = this.state.productArray.slice();
    existingLists.push(product);
    this.setState({
      productArray: existingLists
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company inventory"), React.createElement("h4", null, "Showing all Available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      productArray: this.state.productArray
    }), React.createElement("hr", null), React.createElement("h4", null, "Add a new product to inventory"), React.createElement(ProductAdd, {
      createProducts: this.createProducts
    }));
  }

}

const element = ReactDOM.render(React.createElement(ProductList, null), document.getElementById('root'));