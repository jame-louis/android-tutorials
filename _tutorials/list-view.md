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

## ListView 组件

ListView 是 Android 中常用的 UI 组件，用于显示列表数据。它可以垂直滚动，显示多个列表项。

