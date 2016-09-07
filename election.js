$(document).ready(function pollResults(){

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    data: { },
    dataType: 'JSON'
  }).done(function(responseData){
    var candidateJSON = responseData;
    var candidateList = candidateJSON["candidates"];
    $('#results').empty();

    for(i=0; i<candidateList.length; i++) {
      var candidate = candidateList[i];
      var listItem = document.createElement('li')
      var voteButton = document.createElement('button');

      $(listItem).attr('data-name', candidate.name);
      $(listItem).html(candidate.name + ': ' + candidate.votes);
      $('#results').append(listItem);
      $(listItem).append(voteButton);
      $(voteButton).html('VOTE for ' + candidate.name);
      $(voteButton).attr('id', candidate.name);
    }

    $('button').on('click', function(){
      $.ajax({
        url: 'https://bb-election-api.herokuapp.com/vote',
        method: 'POST',
        data: $(this).data('name')
      });
    });

  });

  $('button').on('click', pollResults);

});
