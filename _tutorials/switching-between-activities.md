---
layout: tutorial
title: "切换活动组件"
tutorial_name: switching-between-activities
difficulty: Beginner
duration: 45 mins
creator: jame louis
date: 2025-11-29
---

## 准备工作

在此教程中，您将学习如何在Android应用中切换活动组件。

### 前提条件

- 已安装 Android Studio 4.1.1
- 具备 Java 的基础理解
- 完成[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})
- 30–60 分钟的空闲时间

### 学习内容

- 如何创建新的活动组件
- 如何在活动之间切换
- 如何在活动之间传递数据

## 创建项目

- 项目名称：SwitchingActivity
- 包名：com.example.switchingactivity
- 如遇到问题，请参考[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})。

## 主界面设计

- 添加一个可编辑的文本框（EditText），文本为“张三”，居中显示，id 为 `edittext_name_main`。
- 添加一个按钮（Button），文本为“登入”，水平居中显示，距离文本框底部 16dp, onClick 事件为 `MainAcitity.onClickLogin`。
- 在 `MainActivity.java` 中添加 `onClickLogin` 方法，用于处理按钮点击事件。
- 配置按钮点击事件，将在屏幕上显示文本框中的内容（Toast）。

![按钮点击事件绑定]({{ '/assets/images/button-onclick-binding.png' | relative_url }})

### activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/edittext_name_main"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ems="10"
        android:inputType="textPersonName"
        android:text="张三"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:onClick="onClickLogin"
        android:text="登入"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/edittext_name_main" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
### MainActivity.java

```java
package com.example.switchingactivity;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void onClickLogin(View view) {
        EditText editTextName = findViewById(R.id.edittext_name_main);
        String name = editTextName.getText().toString();
        Toast.makeText(this, "你好，" + name, Toast.LENGTH_SHORT).show();
    }
}
```

### 运行应用

![运行应用]({{ '/assets/images/run-app-switching-activity-1.gif' | relative_url }})


## 新建一个活动组件

![新建活动组件]({{ '/assets/images/new-empty-activity.png' | relative_url }})

- 在项目视图中，选中`java`文件夹，右键点击，选择`New` -> `Activity` -> `Empty Activity`。

![配置新活动组件]({{ '/assets/images/configure-activity.png' | relative_url }})

- 活动名称：`SecondActivity`
- 布局文件名称：`activity_second`
- 包名：`com.example.switchingactivity`

### 设计第二个活动组件的布局

- 添加一个文本视图（TextView），文本为“第二个活动组件”，居中显示，id 为 `textview_name_second`。

最终 `activity_second.xml` 代码如下：
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".SecondActivity">

    <TextView
        android:id="@+id/textview_name_second"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="第二个活动组件"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
## Intent

现在，我们已经设计了第二个活动组件，加上已有的主活动组件，那么我们怎么才能从主活动组件切换到第二个活动组件呢？答案是使用 Intent。

### 什么是 Intent？

Intent 是 Android 中用于在不同组件之间进行通信的一种机制。它可以用于启动活动、服务、广播接收器等。在我们的例子中，我们将使用 Intent 来启动第二个活动组件。

### Intent 类型

Intent 可以分为两种类型：显式 Intent 和隐式 Intent。

- 显式 Intent：指定要启动的组件的名称。
- 隐式 Intent：不指定要启动的组件的名称，而是根据组件的行为来确定要启动的组件。

### 显式 Intent

显式 Intent 是指在 Intent 中指定要启动的组件的名称。在我们的例子中，我们将使用显式 Intent 来启动第二个活动组件。

```java
Intent intent = new Intent(this, SecondActivity.class);
startActivity(intent);
```

- `this` 表示当前活动组件的上下文。即当前活动组件的实例。
- `SecondActivity.class` 表示要启动的活动组件的类名。
- `startActivity(intent)` 表示启动活动组件。

### 集成显式 Intent 到主活动组件

- 在 `MainActivity.java` 中，添加一个 `onClickLogin` 方法，用于处理登录按钮的点击事件。
- 在 `onClickLogin` 方法中，创建一个 `Intent` 对象，指定要启动的组件为 `SecondActivity.class`。
- 调用 `startActivity(intent)` 方法启动第二个活动组件。

```java
public void onClickLogin(View view) {
    EditText editTextName = findViewById(R.id.edittext_name_main);
    String name = editTextName.getText().toString();
    Toast.makeText(this, "你好，" + name, Toast.LENGTH_SHORT).show();

    Intent intent = new Intent(this, SecondActivity.class);
    startActivity(intent);
}
```

### 运行应用

![运行应用]({{ '/assets/images/run-app-switching-activity-2.gif' | relative_url }})