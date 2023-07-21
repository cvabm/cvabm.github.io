[[toc]]

## navigate 和 push 区别

如果有已经加载的页面，navigate 方法将跳转到已经加载的页面，而不会重新创建一个新的页面。 push 总是会创建一个新的页面，所以一个页面可以被多次创建

## navigation 方法

```
navigate - go to another screen, figures out the action it needs to take to do it
reset - wipe the navigator state and replace it with a new routes
goBack - close active screen and move back in the stack
setParams - make changes to route's params
dispatch - send an action to router
setOptions - update the screen's options
isFocused - check whether the screen is focused
addListener - subscribe to updates to events from the navigators


```

## stacknavigator 方法

```
replace - replace the current route with a new one
push - push a new route onto the stack
pop - go back in the stack
popToTop - go to the top of the stack
```

## tabnavigator 方法

```
jumpTo - go to a specific screen in the tab navigator
```

## drawernavigator 方法

```
jumpTo - go to a specific screen in the drawer navigator
openDrawer - open the drawer
closeDrawer - close the drawer
toggleDrawer - toggle the state, ie. switch from closed to open and vice versa
```

<https://reactnavigation.org/docs/navigation-prop/>

### onBackAndroid

```
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);

      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);

  onBackAndroid = () => {
    // NativeModules.startNew.toBack();
    return false;
  };
```

### focus 监听

```
componentWillMount:
    this.focusListener = this.props.navigation.addListener(   'focus',   (payload) => {
        this.state.pageFocus = true;
      },
    );
    this.blurListener = this.props.navigation.addListener('blur', (payload) => {
      this.state.pageFocus = false;
    });

componentWillUnmount:

 this.focusListener();
    this.blurListener();

```
