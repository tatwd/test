$(function() {
  var books = $('#books');

  function loading(isLoading) {
    var html = isLoading
      ? `
<div class="text-center loading">
  <div class="spinner-grow text-secondary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`
      : '';
    $(books).html(html);
  }

  function failed(err) {
    console.log(err.status, err.statusText);
  }

  function succeeded(data) {
    loading(false);
    var badges = {
      TODO: 'badge-secondary',
      READING: 'badge-info',
      FINISHED: 'badge-success'
    };
    var authorTypes = {
      WRITER: '作者',
      TRANSLATOR: '译者'
    };
    var h = function(i) {
      var authors = i.authors.reduce((r, i) => {
        var t = authorTypes[i.type];
        r += `${t}: ${i.name} `;
        return r;
      }, '');

      return `
<li class="list-group-item">
  <p class="lead">${i.title}</p>
  <p class="text-muted">
    <span>${authors}</span>
    <span>${i.press}</span>
    <span>${i.publish_at ? i.publish_at + ' 版' : ''}</span>
  </p>
  <p class="mb-1 text-muted">
    <span class="badge badge-pill ${badges[i.status]}">${i.status}</span>
    <span>${i.begin_at || '-'} to ${i.end_at || '-'}</span>
  </p>
</li>`;
    };

    data.forEach(i => {
      var html = $(books).append(h(i));
    });
  }

  loading(true);
  window.setTimeout(function() {
    $.get('books.json')
      .done(succeeded)
      .fail(failed);
  }, 500);
});
