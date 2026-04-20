import { useState } from "react";

const useSelection = () => {
	const [selectedItems, setSelectedItems] = useState([]);
	const isSelected = (item) => {
		if (selectedItems.length == 0) {
			return false;
		}
		return selectedItems.find((x) => x.id == item.id) ? true : false;
	};
	const selectItem = (item) => {
		//console.log("isSelected", item?.id, isSelected(item));
		if (isSelected(item)) {
			item.selected = false;
			setSelectedItems((prevItems) =>
				prevItems.filter((x) => x.id != item?.id),
			);
		} else {
			item.selected = true;
			setSelectedItems([...selectedItems, item]);
		}
	};
	return {
		selectedItems,
		setSelectedItems,
		isSelected,
		selectItem,
	};
};

export default useSelection;
