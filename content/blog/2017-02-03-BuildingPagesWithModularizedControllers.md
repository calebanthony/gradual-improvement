---
title: Building Modular Pages in Laravel 5
---

I'm building a Laravel web app that utilizes various components to make up a page. I also want to let users build their own pages down the line, so there needs to be a way for a page controller to be built out utilizing various components.

However, each component can be reused on multiple pages, and some components have complex logic associated with them, so it makes the most sense to have them in their own controllers.

To solve this problem, we simply call the component controllers from inside the page controller to get built out.

Here is an example of the page controller that will build the page based on the predefined components of `ProjectListController` and `SearchBoxController`.

```javascript

class HomeController extends Controller  
{
    public function index()
    {
        $projectList = (new ProjectListController())->index();
        $searchBox = (new SearchBoxController())->index();

        return view("Insights::index")
            ->with('projectList', $projectList)
            ->with('searchBox', $searchBox);
    }
}
```

The `index()` method in the component controller returns the view, making each component fully self-contained.

So far this has worked flawlessly, and there haven't been any issues!
