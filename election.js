$(document).ready(function pollResults(){

  $.ajax({                                              // get JSON date for candidate and vote from heroku
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    data: { },
    dataType: 'JSON'
  }).done(function(responseData) {
      var candidateList = responseData["candidates"];
      $('#results').empty();

      for(i=0; i<candidateList.length; i++) {
        var candidate = candidateList[i];
        var listItem = document.createElement('li')         // create an <li> for each candidate with vote count
        var voteButton = document.createElement('button');  // create a <button> to post votes
        $(voteButton).addClass('vote-button');

        $(listItem).html(candidate.name + ': ' + candidate.votes);
        $('#results').append(listItem);
        $(listItem).append(voteButton);
        $(voteButton).attr('data-id', candidate.id);
        $(voteButton).html('VOTE for ' + candidate.name);

      }

      $('.vote-button').on('click', function(eventObject){  // only the <button> for gary responds to this
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          data: { "id" : $(this).data('id') },
          dataType: 'json'
        }).done(pollResults);
      });

    });

  $('button').on('click', pollResults);

});
