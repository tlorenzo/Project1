

var productSearch = '';


$('#search-button').on('click', function () {


  productSearch = $('#productSearch').val();
  $("#customers").children('tr:not(:first)').remove();

  //if Product Search is not Empty execute this API calls
  if (productSearch != '') {
    //Try Wal-mart API call
    try {
      searchWalmart(productSearch);
    }
    catch (error) {
      var errorMessage = error.name + ' ' + error.message;
      console.log(errorMessage);
    }

    //Try BestBuy API call
    try {
      searchBestBuy(productSearch);
    }
    catch (error) {
      var errorMessage = error.name + ' ' + error.message;
      console.log(errorMessage);
    }
  }
});



//walmart function 
function searchWalmart(productSearch) {

  //variables for Wal-mart function 
  var walmart_query = productSearch;
  var walmart_apiKey = 'wymapcqzkbzwruabx9t3cefx';
  var walmart_logo = '<td><img class="vendor-logo" src="assets/images/walmart-logo-transparent.png" alt="walmart"></td>'

  //Wal-mart API function 
  $.ajax({
    url: "https://mighty-river-19291.herokuapp.com/cors",
    data: {
      url: 'http://api.walmartlabs.com/v1/search?apiKey=' + walmart_apiKey + '&query=' + walmart_query,
      key: "8b5dcaf7cdfb9c46221d492eec6560c571d6ec218b2485c54075ab7840fa77f9"
    },
    method: "POST"
  }).then(function (walmart_response) {
    // Get reference to existing tbody element, create a new table row element
    //console.log("walmart", walmart_response);
    //console.log("walmart items", walmart_response.items);

    //constructor for items 
    const { items } = walmart_response;

    //for loop to loop through wal-mart products 
    for (i = 0; i < 5; i++) {
      //console.log("item " + i +":  "+ items[i].name, "sales price:  " + items[i].salePrice, "medium image:   " + items[i].mediumImage)

      var walmartImage = items[i].mediumImage;

      if (walmartImage != null) {
        walmartImage = walmartImage;
      }
      else {
        walmartImage = 'http://via.placeholder.com/140x100';
      }

      $('#customers').append(
        '<tr><td>'
        + items[i].name +
        '</td><td><img class="result-thumbnail" src="'
        + items[i].mediumImage +
        '" alt = "product" width="140"></td>'
        + walmart_logo +
        '<td>$'
        + items[i].salePrice +
        '</td></tr>');
    }
  });
}

//Best Buy function 
function searchBestBuy(productSearch) {

  //BestBuy API variables
  var bestbuy_query = productSearch;
  var bestbuy_apiKey = 'N45Lkw1tBElVvgFZZmAYoPaw';
  var bestbuy_queryURL = 'https://api.bestbuy.com/v1/products((search=' + bestbuy_query + '))?apiKey=' + bestbuy_apiKey + '&format=json';
  var bestbuy_logo = '<td><img class="vendor-logo" src="assets/images/best-buy-logo-transparent.png" alt="bestbuy"></td>'

  //BestBuy API Call
  $.ajax({
    url: bestbuy_queryURL,
    method: 'GET'
  }).then(function (bestbuy_response) {
    // Get reference to existing tbody element, create a new table row element
    //console.log("best buy", bestbuy_response);
    //console.log("best buy products", bestbuy_response.products);

    //constructor for products
    const { products } = bestbuy_response;

    //for loop through Best Buy API
    for (i = 0; i < 5; i++) {
      //console.log("item " + i +":  "+ products[i].name, "sales price:  " + products[i].salePrice, "medium image:   " + products[i].image)

      var bestBuyImage = products[i].image;

      if (bestBuyImage != null) {
        bestBuyImage = bestBuyImage;
      }
      else {
        bestBuyImage = 'http://via.placeholder.com/140x100';
      }

      $('#customers').append(
        '<tr><td>'
        + products[i].name +
        '</td><td><img class="result-thumbnail" src="'
        + bestBuyImage +
        '" alt = "product" width="140"></td>'
        + bestbuy_logo +
        '<td>$'
        + products[i].salePrice +
        '</td></tr>');
    }
  });
}



