const inventoryPageElements = {
  inventory_list: '[data-test="inventory-list"]',
  inventory_item: '[data-test="inventory-item"]',
  inventory_item_price: '[data-test="inventory-item-price"]',
  inventory_item_desc: '[data-test="inventory-item-desc"]',
};

const colors = {
  red_color: "rgb(226, 35, 26)",
  white_color: "rgb(255, 255, 255)",
};

/*
We can have multiple dirs inside POM:
- inventory that contains file/s with selectors for inventory page
- login that contains file/s with selectors for login page
*/

// URL treba da bude u config fajlu, ne ovde! Postoji razlika!

export { inventoryPageElements, colors };
