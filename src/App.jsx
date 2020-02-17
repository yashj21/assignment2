let PRODUCTS = [];
const RESET_VALUES = {id: '', category: '', price: '$', name: ''};
class ProductAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            product:  RESET_VALUES
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.productAdd;
        form.price.value = form.price.value.substring(1);
        const productnew = {
      name: form.productname.value, category: form.productcat.value,
      price: form.price.value, url:form.url.value,
    }
    this.props.createProducts(productnew);
    form.productname.value='';
    this.setState((prevState) => {
        prevState.product.price = '$';
        return { product: prevState.product }
    })

    form.productcat.value='';
    form.url.value = '';
    
    //form.owner.value = ""; form.title.value = "";
    }
    handleChange(e) {
		const target = e.target
		const name = target.name
		const value = target.value

		this.setState((prevState) => {
			prevState.product.price = value
			return { product: prevState.product }
		})
	}
    render(){
        const paddingStyle = {margin: 10};
        const paddingStyle2 = {margin:80};
        return (
            <form name="productAdd" onSubmit={this.handleSubmit}>
            <label htmlFor="productname" style={paddingStyle}>Product Name</label>&nbsp;
            <label htmlFor="productcat" style={paddingStyle2}>Product Category</label>
            <br/>
            <input type="text" name="productname" style={paddingStyle} />&nbsp;
            <select id="productcat" style={paddingStyle}>&nbsp;
            <option value="Shirts">Shirts</option>
             <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Accessories">Accessories</option>
            </select>
            <br/>
            <label htmlFor="price" style={paddingStyle}>Price Per Unit</label>&nbsp;
            <label htmlFor="url" style={paddingStyle2}>Image URL</label>&nbsp;
            <br/>
            <input type="text" name="price" onChange={this.handleChange} value={RESET_VALUES.price} style={paddingStyle}/>&nbsp;
            <input type="text" name="url" style={paddingStyle}/>;
            <br/>
            <br/>
            <button>Add Product</button>
          </form>
          );
    }
}
class ProductTable extends React.Component{
    
    constructor(props){
        super(props)
    }
    render(){
        let rows= [];
      //  let productArray = this.props.productArray;
      if(this.props.productArray && Array.isArray(this.props.productArray)){
        this.props.productArray.forEach(product => {
            rows.push(<ProductRow 
                key = {product.id}
                productid={product.id}
                productname={product.name}
                productcat = {product.category}
                productprice = {'$'+product.price}
                producturl = {product.url} ></ProductRow>);
    });
}
        const borderedStyle = {border: "1px solid silver", padding: 4};
        return (
            <table style={{borderCollapse: "collapse"}}>
            <thead className="thead-dark">
                <tr>
                    <th style={borderedStyle}>Name</th>
                    <th style={borderedStyle}>Category</th>
                    <th style={borderedStyle}>Price</th>
                    <th style={borderedStyle}>Image</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            {rows}  
            </tbody>
          </table>
          );
    }
}

class ProductRow extends React.Component{
    constructor(){
        super();
    //    this.handleClick = this.handleClick.bind(this);
    }
    // handleClick(e){
    //     return window.open($this.props.producturl,'_blank');
    // }
    render(){
        const borderedStyle = {border: "1px solid silver", padding: 4};
        return (
            <tr>
            <td style={borderedStyle}>{this.props.productname}</td>
            <td style={borderedStyle}>{this.props.productcat}</td>
            <td style={borderedStyle}>{this.props.productprice}</td>
            <td style={borderedStyle}><a href={this.props.producturl} target ="_blank">View</a></td>
          </tr>);
    }
}
class ProductList extends React.Component{
        constructor(){
            super();
            this.state = {
                productArray:[]
            };
            this.createProducts = this.createProducts.bind(this);
        }
        // componentDidMount() { 
        //     this.setState({
        //         productArray:[{}]
        //     }) }
        createProducts(product){
            product.id = new Date().getTime();   
            const existingLists = this.state.productArray.slice();
            existingLists.push(product);
            this.setState({
                productArray:existingLists
            }); 
        }
        render(){

            return (
                <React.Fragment>
                <h1>My Company inventory</h1>
                <h4>Showing all Available products</h4>
                <hr/>
                <ProductTable productArray={this.state.productArray} />
                <hr />
                <h4>Add a new product to inventory</h4>
                <ProductAdd createProducts={this.createProducts}/>
                </React.Fragment>
             );
        }
    }

    const element = 
ReactDOM.render(<ProductList />,document.getElementById('root'));