type ProductCategoryProps = {
   onCategoryChange : (category:string) => void;
}

export default function ProductCategory({
onCategoryChange,
}:ProductCategoryProps){

    return(
<select
    defaultValue=""
    onChange={(e) =>onCategoryChange(e.target.value)}
    className="sort-select">

        <option value="">Categories: </option>
        <option value = "beauty">Beauty</option>
        <option value= "fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
        <option value="laptops">Laptops</option>
        <option value="kitchen-accessories">Kitchen-accessories</option>
</select>
    );
}