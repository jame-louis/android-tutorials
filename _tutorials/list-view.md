---
layout: tutorial
title: "列表视图"
tutorial_name: list-view
difficulty: Beginner
duration: 45 mins
creator: jame louis
date: 2025-10-25
---

## 准备工作

在此教程中，您将学习如何在Android应用中创建和使用列表视图。

### 前提条件

- 已安装 Android Studio 4.1.1
- 具备 Java 的基础理解
- 完成[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})
- 30–60 分钟的空闲时间

### 学习内容

- 如何创建和配置列表视图
- 如何在列表视图中显示数据
- 如何处理列表项的点击事件

## 创建项目

- 项目名称：ListView
- 包名：com.example.listview
- 如遇到问题，请参考[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})。

## 显示列表数据

比如我们有一个包含中国城市的列表，我们想在Android应用中显示这些城市。我们先从简单的包含北上广深的4个城市列表开始。

- 在布局文件中添加LinearLayout
- 依次添加4个TextView，分别显示北京、上海、广州、深圳
    - 设置TextView的Height为64dp；
    - 设置TextView的TextSize为30sp；
    - 设置TextView的Gravity为Center；

![4个城市的列表]({{ '/assets/images/manual-fake-list-view.png' | relative_url }})

那么，我们的列表就显示出来了。

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <LinearLayout
        android:id="@+id/city_list"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:dividerPadding="16dp"
        android:orientation="vertical"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <TextView
            android:id="@+id/textView"
            android:layout_width="match_parent"
            android:layout_height="64dp"
            android:gravity="center"
            android:text="北京"
            android:textSize="30sp" />

        <TextView
            android:id="@+id/textView2"
            android:layout_width="match_parent"
            android:layout_height="64dp"
            android:gravity="center"
            android:text="上海"
            android:textSize="30sp" />

        <TextView
            android:id="@+id/textView3"
            android:layout_width="match_parent"
            android:layout_height="64dp"
            android:gravity="center"
            android:text="广州"
            android:textSize="30sp" />

        <TextView
            android:id="@+id/textView4"
            android:layout_width="match_parent"
            android:layout_height="64dp"
            android:gravity="center"
            android:text="深圳"
            android:textSize="30sp" />
    </LinearLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```
但是，中国的城市远不止这4个，按照上述的方法，我们需要添加更多的TextView来显示其他城市。这显然会导致大量的重复工作，
且不利于后期维护。

### 显示更多城市

![重构布局]({{ '/assets/images/manual-fake-list-view-refactor.png' | relative_url }})

首先，我们先重构一下布局文件。
- 移除4个TextView。
- 设置LinearLayout的id为city_list。

接着，我们创建一个CityData类，用于表示城市数据。

```java
import java.util.Arrays;
import java.util.List;

public class CityData {
    // 4个城市：北上广深
    public static List<String> getSampleCities() {
        return Arrays.asList("北京", "上海", "广州", "深圳");
    }
    // 343 个地级及以上城市（含直辖市、自治州、地区、盟）
    public static List<String> getAllCities() {
        return Arrays.asList("上海", "广州", "深圳"
            /* 其他城市 */
        );
    }
}
```

然后，为了显示更多的城市，我们可以使用循环来动态创建TextView。

- 在Java代码中，我们可以使用for循环来创建多个TextView。
- 每个TextView的文本内容可以从一个字符串数组中获取。

```java
package com.example.listview;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<String> cities = CityData.getSampleCities();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LinearLayout city_list = findViewById(R.id.city_list);
        for(String city : cities) {
            TextView tv = new TextView(city_list.getContext());
            tv.setText(city);
            tv.setTextSize(30);
            tv.setGravity(Gravity.CENTER);
            tv.setHeight(128);
            city_list.addView(tv);
        }
    }
}
```

最后，运行应用，我们就可以看到4个城市都被显示出来了。

![4个城市的列表]({{ '/assets/images/4-cities.png' | relative_url }})

为了显示更多的城市，我们可以将CityData.getSampleCities()替换为CityData.getAllCities()。
运行应用，我们就可以看到343个城市都被显示出来了。

![343个城市的列表]({{ '/assets/images/all-cities.png' | relative_url }})

但是，我们发现无法滚动查看所有的城市。这是因为LinearLayout默认是不支持滚动的。

为了解决这个问题，我们可以将添加ScrollView组件到布局文件中，将LinearLayout作为ScrollView的子组件。

![all-cities-with-scroll-view]({{ '/assets/images/all-cities-with-scroll-view.png' | relative_url }})

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent">

        <LinearLayout
            android:id="@+id/city_list"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:dividerPadding="16dp"
            android:orientation="vertical" />
    </ScrollView>

</androidx.constraintlayout.widget.ConstraintLayout>
```

最终的效果如下：

![所有城市的列表]({{ '/assets/images/all-cities-with-scroll-view.gif' | relative_url }})

### 添加点击事件

为了给每个城市添加点击事件，我们可以在循环中为每个TextView添加点击事件。

```java
for(String city : cities) {
    TextView tv = new TextView(city_list.getContext());
    tv.setText(city);
    tv.setTextSize(30);
    tv.setGravity(Gravity.CENTER);
    tv.setHeight(128);
    city_list.addView(tv);
    tv.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            Toast.makeText(MainActivity.this, "点击了" + city, Toast.LENGTH_SHORT).show();
        }
    });
}
```

![所有城市的列表]({{ '/assets/images/all-cities-with-scroll-view-and-event.gif' | relative_url }})

### 使用自定义布局文件City.xml

- 新建一个XML布局文件City.xml，用于定义每个列表项的布局。
- 在City.xml中，添加一个TextView用于显示城市名称。
    - 设置TextView的id为city_name。
    - 设置TextView的高度为64dp。
    - 设置TextView的文本为城市名称。
    - 设置TextView的文本大小为30sp。
    - 设置TextView的重力为居中对齐。
- 在Java代码中，我们可以使用LayoutInflater来加载City.xml布局文件。
    - 使用LayoutInflater的inflate()方法加载City.xml布局文件。
    - 通过findViewById()方法获取TextView的实例。
    - 将城市名称设置到TextView中。
    - 将加载的视图添加到LinearLayout中。

![City.xml布局]({{ '/assets/images/city-layout.png' | relative_url }})

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/city_name"
        android:layout_width="match_parent"
        android:layout_height="64dp"
        android:gravity="center"
        android:text="城市名称"
        android:textSize="30sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

```java
package com.example.listview;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<String> cities = CityData.getAllCities();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LinearLayout city_list = findViewById(R.id.city_list);
        for(String city : cities) {
            View view = getLayoutInflater().inflate(R.layout.city, city_list, false);
            TextView tv = view.findViewById(R.id.city_name);
            tv.setText(city);

            tv.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(tv.getContext(), tv.getText(), Toast.LENGTH_SHORT).show();
                }
            });
            city_list.addView(view);
        }
    }
}
```
## 重构

原实现直接把城市字符串循环 inflate 进 LinearLayout，逻辑全部写在 Activity 中，职责混乱、无法复用，且当数据量增大时会因不断创建 View 导致卡顿。

### 重构目标  

1. 把“如何展示一条数据”与“数据本身”解耦；  
2. 引入 Adapter 模式，为后续扩展（缓存、复用、Header/Footer）留好口子；  

### 重构手法  

- 提炼 Adapter  
将“获取总数 + 创建 item 视图”抽象成 CustomAdapter，Activity 只负责创建 Adapter 并交给 UI 容器。  
- 封装 UI 容器  
自定义 CustomListView，内部仍用 LinearLayout 线性添加，但对外暴露 setAdapter()，屏蔽掉循环 inflate 的细节。  
- 保留原始布局文件  
R.layout.city 继续复用，无需再写 XML；点击事件也在 Adapter 中绑定，符合“谁持有数据谁负责交互”的原则。

```java
package com.example.listview;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<String> cities = CityData.getAllCities();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        CustomListView customListView = findViewbyId(R.id.city_list);
        CustomAdapter ca = new CustomAdapter(this, cities);
        customListView.setAdapter(ca);
    }

    private CustomListView findViewbyId(int id) {
        CustomListView listView = new CustomListView(id);
        return listView;
    }

    private class CustomAdapter {
        private Context mCtx;
        private List<String> mData;
        public CustomAdapter(Context ctx, List<String> cities) {
            mCtx = ctx;
            mData = cities;
        }

        int getCount() {
            return mData.size();
        }

        View getView(int position, View convertView, ViewGroup parent)
        {
            convertView = LayoutInflater.from(mCtx).inflate(R.layout.city, parent, false);
            TextView tv = convertView.findViewById(R.id.city_name);
            tv.setText(mData.get(position));

            tv.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(tv.getContext(), tv.getText(), Toast.LENGTH_SHORT).show();
                }
            });

            return convertView;
        }
    }

    private class CustomListView {
        private LinearLayout linearLayout;
        public CustomListView(int id) {
            linearLayout = findViewById(R.id.city_list);
        }
        void setAdapter(CustomAdapter ca) {
            for(int i = 0; i < ca.getCount(); ++i) {
                View convertView = new View(linearLayout.getContext());
                View v = ca.getView(i, convertView, linearLayout);
                linearLayout.addView(v);
            }
        }
    }
}
```
### 效果  

MainActivity 代码量减半，逻辑清晰；新增“区县”数据源时，只需替换 CityData，无需改动 UI 层。下一步若要支持 View 复用，只需在 CustomListView 里加入 ConvertView 缓存池即可，Activity 仍然无感。

### 结论  

一次微小的 Adapter 抽象，就让代码从“脚本式堆积”迈向“可扩展组件”；在 Android 世界里，把“for+inflate”改成“Adapter+容器”永远是最划算的重构第一步。

## ListView 组件

ListView 是 Android 中常用的 UI 组件，用于显示列表数据。它可以垂直滚动，显示多个列表项。

- 基本用法
  - 定义布局文件
    - 在 XML 布局文件中添加 ListView 组件。
  - 创建 Adapter
  - 设置 Adapter 到 ListView
  - 处理点击事件

### 重构

#### 在 XML 布局文件中添加 ListView 组件

- 在 XML 布局文件中添加 ListView 组件
- 设置 ListView 的 ID 为 city_list

![添加ListView组件]({{ '/assets/images/activity-main-list-view.png' | relative_url }})

#### ArrayAdapter

- 显示城市名称，使用系统提供的 ArrayAdapter。

```java
 ArrayAdapter<String> ca = new ArrayAdapter<String>(this, R.layout.city, R.id.city_name, cities);
```
#### 设置 Adapter 到 ListView

- 调用 ListView 的 setAdapter() 方法，将 ArrayAdapter 实例设置到 ListView 中。

```java
 listView.setAdapter(ca);
```

#### 处理点击事件

- 为 ListView 添加点击事件监听器，当用户点击列表项时，弹出 Toast 显示选中的城市名称。

```java
 listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
        String city = ca.getItem(position);
        Toast.makeText(MainActivity.this, city, Toast.LENGTH_SHORT).show();
    }
});
```
#### MainActivity 代码

```java
package com.example.listview;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<String> cities = CityData.getAllCities();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView listView = findViewById(R.id.city_list);
        ArrayAdapter<String> ca = new ArrayAdapter<String>(this, R.layout.city, R.id.city_name, cities);
        listView.setAdapter(ca);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String city = ca.getItem(position);
                Toast.makeText(MainActivity.this, city, Toast.LENGTH_SHORT).show();
            }
        });
    }
}
```

### 效果

![ListView]({{ '/assets/images/list-view.gif' | relative_url }})


## 自定义 Adapter

到此，我们已经完成了 ListView 的基本用法。如果我们需要显示更多的信息，比如“城市照片”，我们可以自定义 Adapter。

### CityData

- 新增CityInfo类，用于存储城市信息，比如城市名称、照片等。
- getSampleCityInfos() 方法，返回一个包含多个 CityInfo 对象的列表。

```java
public class CityData {

    public static class CityInfo {
        int drawableId;
        String name;

        CityInfo(int id, String name) {
            drawableId = id;
            this.name = name;
        }
    };

    public static List<CityInfo> getSampleCityInfos() {
        return Arrays.asList(
                new CityInfo(R.drawable.a, "北京"),
                new CityInfo(R.drawable.b, "上海"),
                new CityInfo(R.drawable.c, "广州"),
                new CityInfo(R.drawable.d, "深圳")
        );
    }
    /* 其他代码 */
}
```
### 新增布局文件

- 新增city_with_image.xml布局文件，用于显示城市照片和名称。
- 布局文件中包含一个 ImageView 用于显示照片，一个 TextView 用于显示名称。
    - 约束布局 ConstraintLayout, Height 为 200dp
    - ImageView 的 ID 为 city_image
    - TextView 的 ID 为 city_name

![city with image]({{ '/assets/images/city-with-image.png' | relative_url }})

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="200dp">

    <ImageView
        android:id="@+id/city_image"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="16dp"
        android:layout_marginLeft="16dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:srcCompat="@drawable/a" />

    <TextView
        android:id="@+id/city_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="城市名称"
        android:textSize="30sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/city_image"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### CustomAdapter

- 新增CustomAdapter类，继承自BaseAdapter。
- 构造函数，接收上下文、布局资源 ID、数据列表作为参数。
- getView() 方法，用于创建列表项视图。
- 其他必要的方法，如 getCount()、getItem() 等。

```java
package com.example.listview;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

public class CustomAdapter extends BaseAdapter {

    private Context context;
    private List<CityData.CityInfo> datas;

    public CustomAdapter(Context context,  List<CityData.CityInfo> objects) {
        this.context = context;
        this.datas = objects;
    }

    @Override
    public int getCount() {
        return datas.size();
    }

    @Override
    public Object getItem(int position) {
        return datas.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.city_with_image, parent, false);
        }

        ImageView imageView = convertView.findViewById(R.id.city_image);
        TextView textView = convertView.findViewById(R.id.city_name);

        CityData.CityInfo cityInfo = datas.get(position);
        imageView.setImageResource(cityInfo.drawableId);

        textView.setText(cityInfo.name);

        return convertView;
    }
}
```

### MainActivity

- 在 MainActivity 中，使用 CustomAdapter 来设置 ListView 的适配器。
- 确保在 AndroidManifest.xml 中注册 MainActivity。

```java
package com.example.listview;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    private List<String> cities = CityData.getAllCities();
    private List<CityData.CityInfo> cityInfos = CityData.getSampleCityInfos();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView listView = findViewById(R.id.city_list);
        CustomAdapter ca = new CustomAdapter(this, cityInfos);
        listView.setAdapter(ca);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                CityData.CityInfo cityInfo = (CityData.CityInfo)ca.getItem(position);
                String city = cityInfo.name;
                Toast.makeText(MainActivity.this, city, Toast.LENGTH_SHORT).show();
            }
        });
    }
}
```

### 运行结果

![list-view-custom-adapter]({{ '/assets/images/list-view-custom-adapter.gif' | relative_url }})

## 总结

- 如何创建和配置列表视图
- 如何在列表视图中显示数据
- 如何处理列表项的点击事件

