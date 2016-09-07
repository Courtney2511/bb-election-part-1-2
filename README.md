# Bikini Bottom Election - Part 2
![Bikini Bottom](images/bikini-bottom.jpg)

## Review
In [Part 1](https://github.com/bitmakerlabs/bb-election-part-1) of this assignment, we looked at querying a JSON API with AJAX for some data about election candidates, and inserting them into the HTML with jQuery. Today, we'll continue where we left off and allow users to vote on candidates!

Because we're building off of Part 1, go ahead and copy your `index.html` and `election.js` files from Part 1 into this repo.

## Voting

![Wish](images/wish.jpg)

Lets add some buttons that'll let us vote for a candidate.

We're gonna be making use of a second endpoint in our API to do this, `POST /vote`. This endpoint requires either an `id` or a `name` be given to it, so that it knows who the vote is going to.  We can insert this info either into the **query string** or the **body** of the request:
+ These two are equivalent:
  + **method:** `POST`, **url:** `https://bb-election-api.herokuapp.com/vote?id=577805c3e30089e66c1ede19`, **body:** `{}`
  + **method:** `POST`, **url:** `https://bb-election-api.herokuapp.com/vote`, **body:** `{"id" : "577805c3e30089e66c1ede19"}`
+ And these two are equivalent:
  + **method:** `POST`, **url:** `https://bb-election-api.herokuapp.com/vote?name=Gary`, **body:** `{}`
  + **method:** `POST`, **url:** `https://bb-election-api.herokuapp.com/vote`, **body:** `{"name" : "Gary"}`

If you want to see it in action, try sending some requests through one of the addons I mentioned above.
+ If you receive a response with a `200` status, and message of `Ok`, it worked!
+ If you get a `400`, you left out `id` and `name`.
+ If you get a `404`, it means that there's no candidate matching the `id` or `name` you entered.
+ `500` means there's a server error of some kind. Either you encountered a bug, or something crashed on the server.

Alright, let's make it happen.

### Your TODO

1. Add a vote `<button>` or `<a>` tag to each candidate, under the `<li>` element. You'll have to add these buttons with jQuery after your first load of the candidates completes, because the candidates won't be populated until this request completes.
1. Each one should have a `data-id` or `data-name` attribute where we'll store the id or name of the candidate. Update your code from **Part 1** where you're inserting the `<li>` element to also insert the candidate's id or name into one of these `data-` attributes.
1. Create a `click` event handler for these buttons. A couple tips:
  + Remember that your page doesn't have vote buttons until after your first load of the candidates, so you can't define your click handler until this request completes. If you try to define your click handler on page load, it won't work.
  + You should only need one event handler for every vote button, you won't need a seperate handler for each button.
1. Construct a `POST` request to `https://bb-election-api.herokuapp.com/vote`:
  + This request should be made whenever the `click` event from one of our vote buttons is fired.
  + Get the `name` or `id` of the candidate who's button was pressed from the `data-` attribute you defined in step 2. You can make use of `$(this).data('id')` or `($this).data('name')` in your click handler for this.
  + Put the `name` or `id` in either the **query string** or the **body** of the `POST` request we're making. Try both!
  + Once we click the vote button, and our `POST` request is sent, make sure that we're receiving a `200` (a success) status code in response to our AJAX request. You'll need to chain another function to your AJAX request in addition to `.done`, called `.fail`. `.done` is triggered when the request completes successfully, `.fail` when it does not. If you're getting back a different status code, something isn't quite right with your request, review the codes listed out above.
1. **STRETCH:**
  + Update the vote counts after a vote
  + Disable the vote buttons after a vote (it's fine if they reenable after refresh)

## We're done!

Congratulations, you've helped bring Bikini Bottom into the 21st century. A winner is you!

![To-Do](images/to-do.jpg)
