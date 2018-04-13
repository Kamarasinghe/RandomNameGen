/*
      <div class="col"><button id="singleName">Single Name</button></div>
      <div class="col"><button id="listOfNames">List</button></div>
      <div class="col"><button id="listOfNamesOfSize">List of size:</button></div>
      <div class="col"><input id="numberOfNames" type="text" size="2"></div>
      
      <div id=results class="col alert alert-primary"> </div>


*/
  let api = 'http://api.giphy.com/v1/gifs/search?';
  let apiKey = '&api_key=EHdxJ2bNKSKZyq6fdZAW6Wtk0RodzldU';
  let queryPup = '&q=puppy';
  let queryCat = '&q=cat';
  let pupUrl = api + queryPup + apiKey;
  let catUrl = api + queryCat + apiKey;

// $.getJSON(url, function(response){

//   let giphy = response.data[0].images.original.url
//   let changed = giphy.slice(0, 13) + giphy.slice(14);


// http://api.giphy.com/v1/gifs/search?&q=puppy&api_key=EHdxJ2bNKSKZyq6fdZAW6Wtk0RodzldU


  $(document).ready(function(){
    let currentIdx = 0

    $('#singleName').click(function() {
      $('.singleNameResult').remove();

      $.getJSON(pupUrl, function(response){

        let giphy = response.data[currentIdx].images.original.url
        let changed = giphy.slice(0, 13) + giphy.slice(14);

        let singleName = genSingleName(RndmName);
        let singleNameResult = '<div class="singleNameResult alert alert-info"></div>';
        $(singleNameResult).prependTo('.singleName2')
        $('.singleNameResult').text(singleName);
        $('.singleImage').attr('src', `${changed}`);
      });

      currentIdx++
    });
    // list names handler
      $('#listOfNames').click(function() {
        $('.areaForList').empty();
        let listOfNames = genListOfNames(RndmName);
        // format each name
        listOfNames.forEach(function(name){
          $('.areaForList').append(`<div> ${name} </div>`);
        });
    });
    // list of size handler
      $('#listOfNamesOfSize').click(function() {
        $('.areaForList2').empty();
        // get value from input numberOfNames
        let listOfNamesLength = Number($('#numberOfNames').val()) === 0 ? 1 : Number($('#numberOfNames').val()) ;
        let listOfNamesOfSize = genListOfNamesOfSize(RndmName, listOfNamesLength);
        listOfNamesOfSize.forEach(function(name){
          $('.areaForList2').append(`<div> ${name} </div>`);
        });
    });
    $('#specificInitial').click(function() {
      $('.specifiedInitial').remove();

      $.getJSON(catUrl, function(response){
        
        let giphy = response.data[currentIdx].images.original.url
        let changed = giphy.slice(0, 13) + giphy.slice(14);

        let inputVal = $('#specificInitialint').val();
        let letters = inputVal.split('')
        let count = letters.reduce((count, ele) => { if (ele === '.') { count++ ; }return count; }, 0);
        if (count < 2) {
          alert("Please input 3 initials separated with periods")
          $('#specificInitialint').val('');
        } else {
          inputVal = inputVal.toUpperCase();
          let namesWithInitials = grabNamesWithInitial(inputVal);
          let singleName = genSingleName(RndmName);
          let specifiedInitial = '<div class="specifiedInitial alert alert-info"></div>';
          $(specifiedInitial).prependTo('.specifiedInit')
          $('.specifiedInitial').text(namesWithInitials);
          $('.initialImg').attr('src', `${changed}`);
        }
      });

      currentIdx++
    });
  });
// })