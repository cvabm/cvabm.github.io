[[toc]]

<https://www.jianshu.com/p/47a2ad2bf527>
## 直接使用

```
    <FlatList
      data={[{key: 'a'}, {key: 'b'}]}
      renderItem={({item}) => <Text>{item.key}</Text>}
    />

可以看出跟之前的ListView很像，但是其中少了dataSource，这里，我们只需要传递数据，其它的都交给FlatList处理好了。
```

## 点击事件

**text 和 button 可直接使用 onPress 方法即可**  
view 的话需要包裹一层 touchable 事件，如下

```
  renderItem={({item}) =>
        <TouchableOpacity
            onPress={
                _ => this._onPressItem(item)
            }
        >
            <Text
                numberOfLines={1}
                style={styles.item}>{item}</Text>
        </TouchableOpacity>
        }

  _onPressItem = (str: string) => {

    };
```

> **TouchableHighlight(高亮触摸)**  
> 当手指点下的时候，该视图的不透明度会进行降低同时会看到相应的颜色  
> **TouchableOpacity(不透明触摸)**
> 当点击按下的时候，该组件的透明度会降低  
> **TouchableWithoutFeedback**  
> 所有能够响应触屏操作的元素在触屏后都应该有一个视觉上的反馈（然而本组件没有任何视觉反馈）  
> **TouchableNativeFeedback**  
> 本组件用于封装视图，使其可以正确响应触摸操作（仅限 Android 平台）

## 隐藏滚动条

```
//隐藏水平
showsHorizontalScrollIndicator = {false}
//隐藏垂直
showsVerticalScrollIndicator = {false}
```

## 属性说明

> - **ItemSeparatorComponent**  
>   行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。在这里可以根据需要插入一个 view
>
> - **ListEmptyComponent**  
>   列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数， 或者渲染好的 element。
>
> - **ListFooterComponent**  
>   尾部组件
>
> - **ListHeaderComponent**  
>   头部组件
>
> - **columnWrapperStyle**  
>   如果设置了多列布局（即将 numColumns
>   值设为大于 1 的整数），则可以额外指定此样式作用在每行容器上。
>
> - **data**  
>   为了简化起见，data 属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如 immutable 数组，请直接使用更底层的 VirtualizedList 组件。
>
> - **extraData**  
>   如果有除 data 以外的数据用在列表中（不论是用在 renderItem
>   还是 Header 或者 Footer 中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。
>
> - **getItem**  
>   获取每个 Item
>
> - **getItemCount**  
>   获取 Item 数量
>
> - **getItemLayout**  
>   是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的`getItemLayout`  
>   用起来就既高效又简单，类似下面这样：  
>   `getItemLayout={(data, index) => ( {length: 行高, offset: 行高 * index, index} )}`注意如果你指定了 SeparatorComponent，请把分隔线的尺寸也考虑到 offset 的计算之中。
>
> - **horizontal**  
>   设置为 true 则变为水平布局模式。
> - initialNumToRender  
>   指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。
>
> - **initialScrollIndex**  
>   指定渲染开始的 item index
>
> - **keyExtractor**  
>   此函数用于为给定的 item 生成一个不重复的 key。Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取 item.key 作为 key 值。若 item.key 也不存在，则使用数组下标。
>
> - **legacyImplementation**  
>   设置为 true 则使用旧的 ListView 的实现。
>
> - **numColumns**  
>   多列布局只能在非水平模式下使用，即必须是 horizontal={false}。  
>   此时组件内元素会从左到右从上到下按 Z 字形排列，类似启用了 flexWrap 的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。
>
> - **onEndReached**  
>   当列表被滚动到距离内容最底部不足 onEndReachedThreshold 的距离时调用。
>
> - **onEndReachedThreshold**  
>   决定当距离内容最底部还有多远时触发 onEndReached 回调。  
>   注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
>
> - **onRefresh**  
>   如果设置了此选项，则会在列表头部添加一个标准的 RefreshControl 控件，  
>   以便实现“下拉刷新”的功能。同时你需要正确设置 refreshing
>   属性。
>
> - **onViewableItemsChanged**  
>   在可见行元素变化时调用。可见范围和变化频率等参数的配置请设置`viewabilityconfig`属性
>
> - **refreshing**  
>   在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。
>
> - **renderItem**  
>   根据行数据 data，渲染每一行的组件。这个参照下面的 demo
>
> - **viewabilityConfig**  
>   请参考[ViewabilityHelper
>   ](https://link.jianshu.com?t=https://github.com/facebook/react-native/blob/master/Libraries/Lists/ViewabilityHelper.js)的源码来了解具体的配置。
>
> - **scrollToEnd**  
>   滚动到底部。如果不设置 getItemLayout 属性的话，可能会比较卡。
>
> - **scrollToIndex**  
>   滚动到指定 index 的 item  
>   如果不设置 getItemLayout 属性的话，无法跳转到当前可视区域以外的位置。
>
> - **scrollToItem**  
>   滚动到指定 item，如果不设置 getItemLayout 属性的话，可能会比较卡。
>
> - **scrollToOffset**  
>   滚动指定距离

## 进阶使用

在这里我准备了一份代码示例：

```
const {
	width,
	height
} = Dimensions.get('window') export
default class Main extends Component {
		// 构造
		constructor(props) {
			super(props);
		}
		refreshing() {
			let timer = setTimeout(() = >{
				clearTimeout(timer) alert('刷新成功')
			},
			1500)
		}
		_onload() {
			let timer = setTimeout(() = >{
				clearTimeout(timer) alert('加载成功')
			},
			1500)
		}
		render() {
			var data = [];
			for (var i = 0; i < 100; i++) {
				data.push({
					key: i,
					title: i + ''
				});
			}

			return ( < View style = {
				{
					flex: 1
				}
			} > <Button title = '滚动到指定位置'onPress = { () = >{
					this._flatList.scrollToOffset({
						animated: true,
						offset: 2000
					});
				}
			}
			/>
                    <View style={{flex:1}}>
                        <FlatList
                            ref={(flatList)=>this._flatList = flatList}
                            ListHeaderComponent={this._header}
                            ListFooterComponent={this._footer}
                            ItemSeparatorComponent={this._separator}
                            renderItem={this._renderItem}
                            onRefresh={this.refreshing}
                            refreshing={false}
                            onEndReachedThreshold={0}
                            onEndReached={
                                this._onload
                            }
                            keyExtractor={(item, index) => String(index)}
                            numColumns ={3}
                            columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

                            / / horizontal = {
				true
			}

			getItemLayout = { (data, index) = >({
					length: 100,
					offset: (100 + 2) * index,
					index
				})
			}

			data = {
				data
			} > </FlatList>
                    </View >

			</View>
            );
        }


        _renderItem = (item) => {
            var txt = '第' + item.index + '个' + ' title=' + item.item.title;
            var bgColor = item.index % 2 == 0 ? 'red' : 'blue';
            return <Text style={[{flex:1,height:100,backgroundColor:bgColor},styles.txt]}>{txt}</Text >
		}

		_header = () = >{
			return < Text style = { [styles.txt, {
					backgroundColor: 'black'
				}]
			} > 这是头部 < /Text>;
        }

        _footer = () => {
            return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text > ;
		}

		_separator = () = >{
			return < View style = {
				{
					height: 2,
					backgroundColor: 'yellow'
				}
			}
			/>;
        }


    }
    const styles=StyleSheet.create({
        container:{

        },
        content:{
            width:width,
            height:height,
            backgroundColor:'yellow',
            justifyContent:'center',
            alignItems:'center'
        },
        cell:{
            height:100,
            backgroundColor:'purple',
            alignItems:'center',
            justifyContent:'center',
            borderBottomColor:'#ececec',
            borderBottomWidth:1

        },
        txt: {
            textAlign: 'center',
            textAlignVertical: 'center',
            color: 'white',
            fontSize: 30,
        }

    })

```
