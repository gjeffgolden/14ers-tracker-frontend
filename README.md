# mySummits Frontend
### Flatiron School Mod3 Project

## Purpose and Functionality
The mySummits website allows a user to login and track their tick list of Colorado 14er summits. The main landing page is the user's personal summit log, which displays all of their summits as well as some basic statistics. From the summit tracker, a user can click on an individual mountain card or use the top navigation to view a peak's conditions updates and enter their own recent observations. These comments persist on the backend and are viewable to all users, with a username and time stamp attached.

## Lessons and Challenges
1. CSS: I struggled with CSS in my Mod2 pair project, and making a pretty site was one of my main goals for Mod3. I gained a ton of understanding about responsive design, flexbox properties and using containers and cards. I also learned to leverage the Chrome DevTools for tinkering and debugging.

2. Event Delegation: I attempted, especially on the conditions.html page, to minimize my use of eventListeners by placing them high up on the DOM Tree and relying on bubbling. It was a huge win to achieve with one eventListener what previously would have taken me dozens and dozens of eventListeners.

3. Switch Case: I made a conscious effort to learn more about using switch statements instead of if/else when applicable to get more comfortable with them. They're really cool, and I plan to write a blog explaining their functionality in the near future.

```
switch (summit.mountain.range) {
            case 'Front': 
                $front.append($cardDiv)
            break
            case 'Sawatch':
                $sawatch.append($cardDiv)
            break
            case 'Elk':
                $elk.append($cardDiv)
            break
            case 'Tenmile-Mosquito': 
                $tenmileMosquito.append($cardDiv)
            break
            case 'San Juan':
                $sanJuan.append($cardDiv)
            break
            case 'Sangre de Cristo':
                $sangreDeCristo.append($cardDiv)
            break
            default: 
                null
        }
```

##Future Features and Goals
1. Better sorting options for the mountain cards and dropdowns, to help navigating to specific summits easier.
2. Registration of a new user.
3. Refactoring, specifically the tracker.js file.
4. Photo backgrounds for each mountain card.
5. Adding a checkmark to each Mountain show page if a user has summited it.