// Require the 'fs' module to interact with the file system
const fs = require('fs');

// Require the 'inventory.json' file to access the inventory data
const inventory = require('./data/inventory.json');

// Define a function to display the current inventory
function displayInventory() {
  // Log a header to the console
  console.log('Inventory:');

  // Iterate over each item in the inventory
  for (const item of inventory) {
    // Log the name and stock level of the current item
    console.log(`- ${item.name}: ${item.inStock} in stock`);
  }
}

// Define a function to add a new item to the inventory
function addItem(name, priceInCents, inStock) {
  // Create a new object representing the new item
  const newItem = {
    // Assign a unique id to the new item based on the length of the inventory array
    id: inventory.length + 1,
    // Set the name, priceInCents, and inStock properties of the new item
    name,
    priceInCents,
    inStock
  };

  // Add the new item to the inventory array
  inventory.push(newItem);

  // Save the updated inventory data to the 'inventory.json' file
  saveInventory();
}

// Define a function to retrieve an item from the inventory based on its id
function getItem(id) {
  // Use the 'find' method to search for an item with a matching id property
  return inventory.find(item => item.id === id);
}

// Define a function to update an existing item in the inventory
function updateItem(id, updates) {
  // Use the 'getItem' function to retrieve the item with the specified id
  const item = getItem(id);

  // If an item with the specified id was found...
  if (item) {
    // Use the 'Object.assign' method to apply the updates to that item
    Object.assign(item, updates);

    // Save the updated inventory data to the 'inventory.json' file
    saveInventory();
  }
}

// Define a function to delete an item from the inventory
function deleteItem(id) {
  // Use the 'findIndex' method to find the index of an item with a matching id property
  const index = inventory.findIndex(item => item.id === id);

  // If an item with the specified id was found...
  if (index !== -1) {
    // Use the 'splice' method to remove that item from the inventory array
    inventory.splice(index, 1);

    // Save the updated inventory data to the 'inventory.json' file
    saveInventory();
  }
}

// Define a function to save the updated inventory data to the 'inventory.json' file
function saveInventory() {
  // Use the 'writeFileSync' method of the 'fs' module to write the updated data to disk
  fs.writeFileSync('./data/inventory.json', JSON.stringify(inventory, null, 2));
}

function filterItems(property, value) {
    return inventory.filter(item => item[property] === value);
  }
  
  // Example usage for filterItems
  /*
  const veganCookies = filterItems('isVegan', true);
  console.log('Vegan cookies:', veganCookies);
  
  const expensiveShoes = filterItems('priceInCents', price => price > 10000);
  console.log('Expensive shoes:', expensiveShoes); /*
  

// Example usage of some of these functions

// Displaying initial state of Inventory 
displayInventory();

// Adding new Item 
addItem('New Item', 999, 10);
displayInventory();

// Updating existing Item 
updateItem(1, { inStock: 5 });
displayInventory();

// Deleting existing Item 
deleteItem(1);
displayInventory();
