# recyclerview
[[toc]]
## 间隔
```
//设置界面布局
LinearLayoutManager manager2 = new LinearLayoutManager(this);
manager2.setOrientation(LinearLayoutManager.HORIZONTAL);
renter_files.setLayoutManager(manager2);

//设置item间隔
renter_files.addItemDecoration(new SpaceItemDecoration(10));
class SpaceItemDecoration extends RecyclerView.ItemDecoration {
    int mSpace;

    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
        super.getItemOffsets(outRect, view, parent, state);
        outRect.left = mSpace;
        outRect.right = mSpace;
        outRect.bottom = mSpace;
    }

    public SpaceItemDecoration(int space) {
        this.mSpace = space;
    }
}
```

## recyclerview框架
<https://github.com/CymChad/BaseRecyclerViewAdapterHelper> （用的人多）  
<https://github.com/Jude95/EasyRecyclerView/blob/master/README_ch.md>  

## 添加header
```
//添加头--在setAdapter之前
        //将布局文件转换成view
        LayoutInflater inflater = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        View headView = inflater.inflate(R.layout.listview_head, null);
        listView.addHeaderView(headView);
        //添加脚
        View footView = inflater.inflate(R.layout.listview_add_foot_view, null);
        //实例化footView的控件
        Button btn_foot = (Button) footView.findViewById(R.id.btn_foot);
        listView.addFooterView(footView);
        //设置适配器        listView.setAdapter(myAdapter);

```
## Item添加和删除
<https://www.jianshu.com/p/9806917d3d99>  


## 简单使用
<https://www.jianshu.com/p/4fc6164e4709>   
## 网格样式和瀑布流
<https://www.jianshu.com/p/7c3c549a0ec4>  

## 相关问题  
### RecyclerView只显示第一行的bug
```
@Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View convertView = layoutInflater.inflate(R.layout.item, null, false); // if use parent, only first line will show up
        return new ViewHolder(convertView);
    }
```