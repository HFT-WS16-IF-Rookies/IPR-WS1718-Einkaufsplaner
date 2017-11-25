# git workflow
### commit naming
  * maximum line lenght 100 characters

  * for all your commits, make sure that there's an issue for it and start the commit message with the issue-number.
    Example: '#1 then commit message here'

    Background:
      * If you use the #<issue number> the commit message will get an automatic link to the referenced issue.
      * The issue will list all commits made, related to it.
 &nbsp;  
 &nbsp;  
  * if you fix/fulfill an issue, that it can be closed after your change is merged, use the keywords for automatically close
    the issue through the commit message.  
    recommended reading: [Closing issues using keywords](https://help.github.com/articles/closing-issues-using-keywords/)

### issue/milestone handling / Project Managing
We'll use the issues & Milestones a bit like a project structure Plan.  
  * For each phase/deliverable there should be a milestone.  

  * Then we'll create an issue for every task we have to do.  
    So, an issue should match the effort of a single work package.

Additional to the issues & Milestones we have a Project called 
Project Board.
  * newly created issues are added automatically to the To-Do list.  
  * closed issues are moved automatically to the Done list.  
  * from the To-Do list to the in progress list no automation exists, 
    so we have to move them manually.  
    It's like defining the works getting done in the next sprint, 
    should be moved there, that everyone is up-to-date what are the 
    tasks for the current sprint.
