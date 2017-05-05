# GA_Project3
Super Awesome Team

<h1>Beers and Books</h1>

  <strong>An app that pair beers with  books and books with beer using third party apis.</strong>
<br/>

<h2>The Requirements</h2>
<br/>
  <h4>MVP - minimum viable product</h4>
<br/>
    A working full-stack application, built in a team
    Use the MEAN stack : Mongo, Express, Angular, Node
    The app should consume an API (self made, a third party, or both)
    A git repository hosted on Github, with a link to the hosted project, and frequent commits dating back to the very beginning of the project. Commit early, commit often
    At least one Github commit per day per member
    A daily tracker that all group members use (Trello, github issues, or another similar tracker), that can be reviewed by the instructional team
    Be deployed online and accessible to the public via Heroku
    Have a link to the hosted working app in the README.md file in the github repo
<br/>

<h2>The Idea</h2>
<br/>
  On the Friday that this project was introduced our group, Amanda Capella, Joe Ciampi and Emily Cali, broke for lunch to theorize what could be done for this assignment. Amanda thought that a beer app would be interesting and Emily thought some kind of reading list could be made. Both these ideas pointed to third party apis. Joe Amanda and Emily all agreed to see what they could do having users create beer and book pairings.
<br/>
  The original plan consisted of a query to an api also triggering the query to the other. This many to many relationship was not easy to digest and theorize so it was dropped in favor of the ability for users to instead pick a beer that they like or want to drink and then a book that they want to read or are reading and having those interact with each other and the user.
<br/>

<h2>The Process</h2>
<br/>
  Visit the <a href="https://trello.com/b/u98Uxw2X">Trello</a>, you may need to be logged in and add yourself to view this board.
<br/>
  This project was started with a repo created by Jow Ciampi, all three members then cloned the repo to their computers and created branches as needed to develop different portions of the code.
<br/>
  Amanda began with the user model and sessions, she created this functionality with multiple npms and validators as well as authentication and encrypting with both json web tokens and bycrypt.
<br/>
  Joe set out to find the appropriate third party beer api and implement it to get information and use that information to make a collection of beers.
<br/>
  Emily searched for a book api to pull data from and complete the same functionality as Joe.
<br/>
  The group planned to come together with their controllers and information and complete a many to many relationship that would not only show that the user selected certain beers and books but that the beers and books were indeed paired for that user.
<br/>
  To mitigate this problem the team reorganized and turned their three controllers into one. Combining their code allowed them to call their data much more easily and set the pairing up simply.
<br/>
  Several Members also took action and nuked thier local repos to attempt to eradicate the merge errors and WHAT?! github situation.

<h2>The Hiccups</h2>
<br/>
  Amanda please explain the struggles you had in third person
<br/>
  Joe please explain the struggles you had in third person
<br/>
  Emily came across many frustrations when the project began, almost every commit she had to deal with merge errors and her team was also coming across an exciting WHAT?! github error. It was never discovered what the real problem was and the team hope to never experience it again. Emily managed this overwhelming communication error between her local files and the remote ones by seeking help from the internet and persons of experience. After getting both a diagram and list from a trusted individual and reading numerous guides online Emily installed a mergetool for terminal and has become quite confident in her handling of git issues.

  Emily began her work on the book api early with various googling. She settled on the open library search api to allow users to search for books by title, however, accessing this data became an issue when it was discovered that not every search result had the same keys, and many of the keys were paired with arrays. This meant that an item was an object containing some strings, some numbers and some arrays of strings that were variable lengths. She approached this prospect cautiously and was able to grab data but was having trouble sending it to the collection it needed to be in. Upon consultation with both Karolin and Dan (the instructor and the teaching assistant) she somehow, as she was trying to show that something was wrong, made it work.

<h2>Styling Decisions</h2>
<br/>
  <h4>Wireframes</h4>
<br/>
    <img src="https://raw.githubusercontent.com/Ciampije/GA_Project3/master/public/assets/project3wireframes.jpg"/>
<br/>
  <h4>Theme</h4>
<br/>
  The thematic look of this app is based on chalkboards and typography.
<br/>
  <h4>Resources</h4>
<br/>
 dafont.com
 <br/>
 google fonts
 <br/>

<br/>
<h2>Functionality</h2
<br/>
  <h4>User Stories</h4>
<br/>
    The user should be able to create an account.
    The user should be able to log in with an account they created.
    ONCE THE USER IS LOGGED IN
    The user should be able to search for a beer.
    The user should be able to see more information about that beer.
    The user should be able to save that beer.
    The user should be able to search for a book.
    The user should be able to see more information about that book.
    The user should be able to save that book.
    The user should be able to confirm the beer and book pairing that they have made.
    The user should be able to see the current books and beers for themselves and other users in a community page.
    The user should be able to create multiple pairings of beers and books.
    The user should be able to look at their profile.
    The user should be able to edit their profile.
    The user should be able to log out of their account.
<br/>

<h4>The 3rd Party APIs</h4>
<br/>
  <strong>Brewery DB</strong>
<br/>
<br/>
  <strong>Open library</strong>
<br/>
    Open Library is an API that contains a vast amount of data about books. There are several APIs that can be used for free by the public through Open Library. The main API is the Open Library Book API which can be queried using parameters such as ISBNs and other codes. For the purposes of this project the Open Library Search API was used as it is able to take titles and author names as queries, which is more user friendly. The data returned on a query to this Search API looks as follows but may or may not contain all the keys below:

      bookObject: {<br/>
        author_key: [],<br/>
        author_name: [], <i>this may or may not actually contain the author name</i><br/>
        cover_edition_key: String,<br/>
        cover_i: Number,<br/>
        ebook_count_i: Number,<br/>
        edition_count: Number,<br/>
        edition_key: [],<br/>
        first_publish_year: YearDate, <i>this is usually mimicked in the publish_date and publish_year but not every book has every one of these</i><br/>
        first_sentence: [],<br/>
        has_fulltext: Boolean,<br/>
        ia: [],<br/>
        ia_box_id: [],<br/>
        ia_collection_s: String,<br/>
        id_goodreads: [],<br/>
        id_librarything: [],<br/>
        isbn: [],<br/>
        key: String,<br/>
        language: [],<br/>
        last_modified_i: Number,<br/>
        lccn: [],<br/>
        person: [],<br/>
        place: [], <i>may refer to the place the book is about or the place the book was created</i><br/>
        publish_date: [],<br/>
        publish_place: [],<br/>
        publish_year: [],<br/>
        publisher: [],<br/>
        seed: [],<br/>
        subject: [],<br/>
        text: [],<br/>
        time: [],<br/>
        title: String,<br/.
        title_suggest: String,<br/>
        type: String<br/>
      }

    Almost every book returned had some variation of place, date and author, because of this those were the keys that the team decided to keep, show and put into the book collection when needed.
<br/>

<h4>NPMS</h4>
<br/>
  <strong>MEAN Stack</strong>
<br/>
  <strong>JSON Web Tokens</strong>
<br/>
  <strong>Body Parser</strong>
<br/>
  <strong>Morgan</strong>
<br/>
  <strong>Bycrypt</strong>




<br/>

<h2>Working as a Team</h2>
<br/>

<br/>


<h2>Next Steps</h2>
<br/>
  With the github errors and controller revamp that the team did they were unable to get to all the features that they would have liked. If they are able, they would like to progress with this project by:<br/>
    making the styling more cohesive<br/>
    adding an about page that is viewable without being logged in <br/>
    showing all the pairings of beers and books that users have by matching their id <br/>
    letting users like and comment on pairings <br/>
    pairings having more information that just the beer name and title <br/>
    having beer and book pairings clickable to show more information about each<br/>




<h2>Special Thanks</h2>
<br/>
  Emily, Amanda and Joe would like to thank the General Assembly team for giving them the opportunity to work as a team and the support provided by the instructors (Matt Huntington, Karolin Rafalski, Kristyn Bryan and Thom Page) and the TAs (Abi Klein, Kaylie Weable and Dan Lawrence).

  Emily would also like to thank Sergio Martins for the github tutorials and sometimes looking at the code.

<h2>Meet the Team</h2>
<br/>
  Amanda - who are you and why do you kick butt



  Joe- who are you and why do you kick butt



  Emily is a Booz Allen Hamilton Employee who was offered the opportunity to develop her skills by taking the General Assembly Web Development Immersive Remote program in the spring of 2017. She holds a bachelor's degree in Biomedical Photographic Communications and, prior to this class, she was working on her own time to improve upon her css and html knowledge. She is very eager to put all that she is learning to work in her next position. She likes to make quilts and imagine css animations in her free time.
