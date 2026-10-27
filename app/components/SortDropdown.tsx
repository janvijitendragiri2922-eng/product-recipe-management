type SortDropdownProps = {
  sortOption: string;
  onSort: (value: string) => void;
};

export default function SortDropdown({
  sortOption,
  onSort,
}: SortDropdownProps) {
  return (
    <select
      value={sortOption}
      onChange={(e) => onSort(e.target.value)}
      className="sort-select"
    >
      <option value="">Sort By : </option>
      <option value="title-asc">Name : A-Z</option>
      <option value="title-desc">Name : Z-A </option>
      <option value="rating-asc">Rating : Low-High</option>
      <option value="rating-desc">Rating : High-Low</option>
      <option value="price-asc">Price : Low-High</option>
      <option value="price-desc">Price : High-Low</option>
    </select>
  );
}
