$(document).ready(function() {
  $('#getQuote').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        var quote = $(post.content).text(); // Removes data included <p> tags
        var author = " - " + post.title;
        
        // Send quotes to frontend
        $('#quoteContent').html(quote);
        $('#quoteTitle').html(author);
        
        // Binds quote to twitter URL button
        $('#tweet-button').attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + author));
        
        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false
    });
  });
  });