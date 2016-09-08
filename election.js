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

        $(listItem).attr('data-name', candidate.name);
        $(listItem).html(candidate.name + ': ' + candidate.votes);
        $('#results').append(listItem);
        $(listItem).append(voteButton);
        $(voteButton).attr('id', candidate.name);
        $(voteButton).html('VOTE for ' + candidate.name);
      }
      //PROBLEMS
      $('#' + candidate.name).on('click', function(){  // only the <button> for gary responds to this
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          data: { "name" : candidate.name }, // this will post a vote but I should be able to use $(this).data('id')
          dataType: 'HTML'
        });                                 // I think that i should have the second ajax call outside of the first one,
      });                                   // but I'm not sure how to access the responseData outside of it

    });

  $('button').on('click', pollResults);

});
