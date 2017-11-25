# git workflow
### commit naming
  * maximum line lenght 100 characters

  * for all your commits, make sure that there's an issue for it and
    start the commit message with the issue-number.  
    Example: '#1 then commit message here'

    Background:
      * If you use the #<issue number> the commit message will get an
        automatic link to the referenced issue.
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
&nbsp;  
&nbsp;  

Additional to the issues & Milestones we have a Project called 
Project Board.
  * newly created issues are added automatically to the To-Do list.
  * closed issues are moved automatically to the Done list.
  * from the To-Do list to the in progress list no automation exists, 
    so we have to move them manually.  
    It should be used to define the for the next sprint. THis way
    everyone is up-to-date what are the tasks of the current sprint.

### push to GitHub
If more than one person works on the same branch, it will happen that
one has done something and pushed it, before you have pushed your work.
&nbsp;  
&nbsp;  
There are two (or maybe more and I just don't know them) ways now:
     1. pull:  
        This will
          * pull the changes you don't have from origin
          * merge them into your local repo

        That way, the commit from the remote, get's placed in the log
        behind the one you did. But chronological seen, this is wrong,
        as you finished later.  
        Also it creates sometimes a strange history, if you have to fix
        merge conflicts, as the yet done upstream commit appears two
        times in the history. 1st is the original commit, and 2nd the
        edited result of your merge conflic fix.

     2. rebase:  
        This will
          * pull the latest changes you don't have
          * move the commits done not online yet into temporary place
          * fast-forward merge the new remote commits
          * try to apply your made commits in the correct order one by
            one ontop.

        This way you still can get merge-conflicts, but now you'll
        have to make the compatibility changes in your own changes and
        the fix won't generate a second commit just because you've had
        to fix a merge-conflict.

That's why we will use rebase if working together in the same branch.  
If git tells you the push was rejected, because of new commits:
    ```
    git fetch origin <branch>
    git rebase origin/<branch>
    ```

If you get merge conflicts, fix it and afterwards do
    ```
    git rebase --continue
    ```
