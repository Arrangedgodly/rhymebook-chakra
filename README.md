# Rhymebook Chakra
The API powered notebook that writes your rhymes (and much more) with you!

## Link to the Project
This project can be found at [Rhymebook](rhymebook.graydonwasil.com)

## About the Project
Rhymebook is a free notetaking service that functions similar to Google Keep or Evernote with additional features. We utilize the [Datamuse API](https://www.datamuse.com/api/) to find suggested terms based upon user input.

### Pages
* New Note
  - Whenever a user inputs lyrics into the 'body' section of the note taking app, an API request is fired off to obtain rhymes, sound alikes, adjectives, nouns, related words, frequent followers, synonyms, and antonyms.
  - Any inputs into the 'title' section will be used for thematic ties ins on the suggested terms from the API.
  - There is no need to manually save your changes to the note, your note is autosaved after a second pause in typing.
  - The 'Add Tags' button opens up a pop up to add a sorting tag, used to group notes inside of your notebook.
* My Notebook
  - The Notebook features two primary sections, an anchor for your 'Active Tags' and a section showing all of the notes in your notebook.
  - Active Tags
    * Populates all of the sorting tags attached to your notes. If you click one of these tags, it will highlight the selected tag and hide all notes not associated with that grouping.
  - Note features:
    * Edit
      - Redirects to the Rhymebook interface for further note editing
    * Delete
      - Creates a delete confirmation popup before allowing the user to remove the note entirely
    * Select
      - Allows you to select multiple notes at once for bulk deletion/adding tags.
    * Pin
      - Moves the note to a seperate list that populates at the top of the page regardless of most recent edit time.
    * Created / Last Edited
      - Shows a timestamp of the time of creation or the most recent time the note was edited, if it has been changed since creation.
* Profile
  * My Information
    - Allows you to change your username, email, or submit an avatar for your profile
  * Preferences
    - Allows you to disable/enable each of the API return categories individually
    - Engine Type:
      * Broad - Title inputs slightly affect the output of the API
      * Specific - Title greatly affects the output from the API. Generally you get a maximum of 5 related terms in any category this way when used correctly.
    - Max Query Returns
      * The max amount of words returned in each category by the API. Capped from 5 - 45


## Technologies Utilized
* Node
  - Vendor Packages:
    * Chakra UI - React UI Kit
    * FontAwesome - Free Icons
    * React Icons - Additional Free Icons
* React
* JavaScript
