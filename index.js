const sUrl = "https://jsonplaceholder.typicode.com";

//TODO change this so it renders into html directly
$(function () {

  $.get(sUrl + "/posts", (data, status) => {
    //Sort json by title
    data.sort( function( a, b ) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
    
        return a < b ? -1 : a > b ? 1 : 0;
    });

    //Dynamically render the page by looping through JSON data
    data.forEach((element) => {      
      $("#results").append( createPostElement(element) );
      const userdata = getUserName(element);
      $("#" + element.id).append(createUserNameElement(userdata)); 
    });
  });

  function createPostElement(element) {
    const $post = 
    `<div class="section" id=${element.id}>
        <h2>${element.title}</h2>
        <p>${element.body}</p>
        <button type="button" class="btn btn-primary btnComment" id="${element.id}"> Comments </button>
      </div>`
      return $post;
  };

  function createUserNameElement(data) {
    const $user = 
    `<div class="user"> <span><i> ${data.name} </i></span></div>`;
    return $user;
  }

  function getUserName(element) {
    $.get(sUrl + "/users/" + element.userId, (data) => {
      //createUserNameElement(data);
      return data;
    })
  }

  //@param id: post's parent id
  function showComment(id) {
    $.get(sUrl + "/posts/" + id + "/comments/", (data, status) => {
      data.forEach((element) => {
        $("#" + id).append("<div class='comments'> <li>" + element.body + " - <b>" + element.email + "</b></li></div>");
      });
    });
    $('#' + id).find('.btnComment').text('Close');
  }

  //@param id: post's parent id
  function hideComments(id){
    $("#" + id).find('.comments').remove();
    $('#' + id).find('.btnComment').text('Comments');
  }

  $(".container").on("click", ".btnComment", function (e) { //toggle effect by changing button text
    e.preventDefault();
    if (this.textContent == 'Close'){
        hideComments(this.id);
    }else{
        showComment(this.id);
    }
  });
});
