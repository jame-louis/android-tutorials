---
layout: tutorial
title: "综合案例 - 找色差小游戏"
tutorial_name: color-difference-game
difficulty: Beginner
duration: 45 mins
creator: jame louis
date: 2025-12-11
---

## 简介

![找色差游戏]({{ '/assets/images/color-difference-game.gif' | relative_url }})

 **找色差游戏**是一款经典且有趣的视觉挑战游戏。在多个颜色相近的方块中，有一个方块的颜色略有不同，玩家需要在限定时间内找出它。这个游戏不仅能锻炼你的色彩辨别能力，更是学习Android开发的绝佳入门项目！

### **什么是Android开发？**

**Android开发**是指为运行Android操作系统的设备（如手机、平板）创建应用程序的过程。通过本教程，你将学习Android应用的核心概念，包括用户界面设计、游戏逻辑实现和数据存储。

### **你将构建的内容**

在本Codelab中，你将从零开始构建一个完整的找色差游戏应用，包含以下功能：

- **动态游戏棋盘**：2×2到8×8的网格，随关卡递增
- **计时系统**：60秒倒计时，挑战极限
- **计分系统**：答对加分，答错扣分
- **难度递增**：色差逐渐变小，网格逐渐变大
- **排行榜**：记录并展示你的最佳成绩

### **本Codelab中用到的Android组件**

- `Activity` - 应用屏幕
- `GridLayout` - 网格布局
- `Button` - 可点击按钮
- `TextView` - 文本显示
- `CountDownTimer` - 倒计时器
- `SQLiteDatabase` - 本地数据存储
- `Intent` - 界面跳转

### 前提条件

- 已安装 Android Studio 4.1.1
- 具备 Java 的基础理解
- 完成[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})
- 掌握列表视图的使用，如果对列表视图不熟悉，请先完成[列表视图]({{ '/tutorials/list-view' | relative_url }})
- 30–60 分钟的空闲时间

## 创建项目

- 项目名称：ColorDifferenceGame
- 包名：com.example.colordifferencegame
- 如遇到问题，请参考[您的第一个Android应用]({{ '/tutorials/your-first-application' | relative_url }})。

## 设计游戏主界面

### **理解布局文件**

Android应用使用XML文件定义用户界面。让我们打开主布局文件：

1. 在左侧 **Project** 面板，展开 `app > res > layout`
2. 双击 `activity_main.xml` 文件
3. 点击右上角的 **"Code"** 按钮查看XML代码

当前内容应该是：
```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### **构建游戏布局**

我们将使用`LinearLayout`创建清晰的层次结构。用以下代码完全替换`activity_main.xml`内容：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    android:background="#F5F5F5">

    <!-- 游戏信息栏 -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:gravity="center"
        android:layout_marginBottom="16dp">

        <TextView
            android:id="@+id/tvScore"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="得分: 0"
            android:textSize="18sp"
            android:textStyle="bold"/>

        <TextView
            android:id="@+id/tvLevel"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="关卡: 1"
            android:textSize="18sp"
            android:textStyle="bold"
            android:gravity="center"/>

        <TextView
            android:id="@+id/tvTime"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="时间: 60s"
            android:textSize="18sp"
            android:textStyle="bold"
            android:gravity="end"/>
    </LinearLayout>

    <!-- 游戏棋盘区域 -->
    <GridLayout
        android:id="@+id/gridLayout"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:layout_margin="8dp"/>

    <!-- 控制按钮 -->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:gravity="center"
        android:layout_marginTop="16dp">

        <Button
            android:id="@+id/btnStart"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="开始游戏"
            android:paddingStart="32dp"
            android:paddingEnd="32dp"/>

        <Button
            android:id="@+id/btnLeaderboard"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="排行榜"
            android:layout_marginStart="16dp"
            android:paddingStart="32dp"
            android:paddingEnd="32dp"/>
    </LinearLayout>

</LinearLayout>
```

### **理解布局元素**

| 组件 | 作用 |
|------|------|
| `LinearLayout` | 垂直排列所有元素 |
| `TextView` (tvScore/tvLevel/tvTime) | 显示得分、关卡、倒计时 |
| `GridLayout` | 动态生成色块网格 |
| `Button` | 开始游戏和查看排行榜 |

> **小贴士**：`android:id="@+id/tvScore"` 创建了一个名为tvScore的ID，我们可以在Java代码中通过这个ID找到它并修改内容。

## 编写游戏逻辑引擎

### **创建游戏逻辑类**

游戏的核心是生成相似但略有差异的颜色。让我们创建一个新类：

1. 右键点击`app > java > com.example.colordifferencegame`
2. 选择 **New > Java Class**
3. 命名为 `ColorDifferenceGame`
4. 粘贴以下代码：

```java
package com.example.colordifferencegame;

import android.graphics.Color;
import java.util.Random;

/**
 * 游戏逻辑核心类
 * 负责生成颜色和计算难度
 */
public class ColorDifferenceGame {
    
    private Random random;
    
    public ColorDifferenceGame() {
        this.random = new Random();
    }
    
    /**
     * 生成一对颜色：不同色和正常色
     * @param level 当前关卡（1开始）
     * @return int[] {differentColor, normalColor}
     */
    public int[] generateColors(int level) {
        // 基础颜色分量（55-255避免颜色太暗）
        int baseR = random.nextInt(200) + 55;
        int baseG = random.nextInt(200) + 55;
        int baseB = random.nextInt(200) + 55;
        
        // 差异度随关卡增加而减小（最小5）
        int difficulty = Math.max(5, 40 - level * 3);
        
        // 在RGB中随机选择一个分量进行修改
        int diffR = baseR;
        int diffG = baseG;
        int diffB = baseB;
        
        int colorComponent = random.nextInt(3); // 0=R, 1=G, 2=B
        int direction = random.nextBoolean() ? 1 : -1; // 增减方向
        int change = difficulty * direction;
        
        switch (colorComponent) {
            case 0:
                diffR = Math.max(0, Math.min(255, baseR + change));
                break;
            case 1:
                diffG = Math.max(0, Math.min(255, baseG + change));
                break;
            case 2:
                diffB = Math.max(0, Math.min(255, baseB + change));
                break;
        }
        
        int normalColor = Color.rgb(baseR, baseG, baseB);
        int differentColor = Color.rgb(diffR, diffG, diffB);
        
        return new int[]{differentColor, normalColor};
    }
    
    /**
     * 根据关卡计算网格大小
     * @param level 当前关卡
     * @return 网格边长（2-8）
     */
    public int getGridSize(int level) {
        int size = 2 + (level - 1) / 2; // 每2关增加1格
        return Math.min(size, 8); // 最大8×8
    }
}
```

### **算法解析**

```java
// 难度公式：level=1时difficulty=37，level=10时difficulty=10
int difficulty = Math.max(5, 40 - level * 3);

// 确保颜色值在0-255范围内
Math.max(0, Math.min(255, baseR + change));
```

> **理解游戏机制**：
> - **色差控制**：关卡越高，difficulty值越小，颜色差异越细微
> - **网格递增**：2关→3×3，4关→4×4，6关→5×5...
> - **随机性**：每次颜色不同，且差异可能出现在R/G/B任意分量

## 实现主游戏功能

### **打开MainActivity.java**

在左侧Project面板，展开`app > java > com.example.colordifferencegame`，双击`MainActivity.java`

### **编写完整代码**

用以下代码替换文件全部内容（稍后我们会逐行解释）：

```java
package com.example.colordifferencegame;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class MainActivity extends AppCompatActivity {

    // 界面组件声明
    private GridLayout gridLayout;
    private TextView tvScore, tvTime, tvLevel;
    private Button btnStart, btnLeaderboard;
    
    // 游戏状态变量
    private ColorDifferenceGame game;
    private CountDownTimer timer;
    private boolean isPlaying = false;
    private int score = 0;
    private int level = 1;
    private int timeLeft = 60;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // 初始化界面组件
        initViews();
        
        // 创建游戏逻辑实例
        game = new ColorDifferenceGame();
        
        // 绑定按钮事件
        btnStart.setOnClickListener(v -> startGame());
        btnLeaderboard.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, LeaderboardActivity.class);
            startActivity(intent);
        });
        
        updateUI();
    }
    
    /**
     * 初始化视图组件（不使用View Binding）
     */
    private void initViews() {
        // findViewById通过ID查找XML中定义的组件
        gridLayout = findViewById(R.id.gridLayout);
        tvScore = findViewById(R.id.tvScore);
        tvTime = findViewById(R.id.tvTime);
        tvLevel = findViewById(R.id.tvLevel);
        btnStart = findViewById(R.id.btnStart);
        btnLeaderboard = findViewById(R.id.btnLeaderboard);
    }
    
    /**
     * 开始新游戏
     */
    private void startGame() {
        // 重置游戏状态
        isPlaying = true;
        score = 0;
        level = 1;
        timeLeft = 60;
        
        // 禁用按钮防止重复点击
        btnStart.setEnabled(false);
        btnLeaderboard.setEnabled(false);
        
        // 启动倒计时
        startTimer();
        
        // 生成第一关
        generateLevel();
    }
    
    /**
     * 倒计时器实现
     */
    private void startTimer() {
        timer = new CountDownTimer(60000, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {
                // 每秒更新一次时间显示
                timeLeft = (int) (millisUntilFinished / 1000);
                tvTime.setText("时间: " + timeLeft + "s");
            }
            
            @Override
            public void onFinish() {
                // 时间到，游戏结束
                endGame();
            }
        };
        timer.start();
    }
    
    /**
     * 生成当前关卡
     */
    private void generateLevel() {
        // 更新关卡显示
        tvLevel.setText("关卡: " + level);
        
        // 计算网格大小
        int gridSize = game.getGridSize(level);
        
        // 生成颜色对：differentColor[0], normalColor[1]
        int[] colors = game.generateColors(level);
        final int differentColor = colors[0];
        final int normalColor = colors[1];
        
        // 随机决定不同颜色的位置
        Random random = new Random();
        final int differentPosition = random.nextInt(gridSize * gridSize);
        
        // 清除旧视图
        gridLayout.removeAllViews();
        gridLayout.setColumnCount(gridSize);
        gridLayout.setRowCount(gridSize);
        
        // 创建色块按钮
        List<Button> buttons = new ArrayList<>();
        for (int i = 0; i < gridSize * gridSize; i++) {
            Button button = new Button(this);
            
            // 设置颜色：如果是目标位置用不同色，否则用正常色
            button.setBackgroundColor(i == differentPosition ? differentColor : normalColor);
            
            // 配置布局参数
            GridLayout.LayoutParams params = new GridLayout.LayoutParams();
            params.width = 0;  // 0dp配合weight会均分空间
            params.height = 0;
            params.columnSpec = GridLayout.spec(GridLayout.UNDEFINED, 1, 1f);
            params.rowSpec = GridLayout.spec(GridLayout.UNDEFINED, 1, 1f);
            params.setMargins(4, 4, 4, 4);  // 按钮间距
            
            button.setLayoutParams(params);
            
            // 点击事件处理
            final int position = i;
            button.setOnClickListener(v -> {
                if (isPlaying) {
                    if (position == differentPosition) {
                        // 答对了！
                        score += 10 * level;
                        level++;
                        Toast.makeText(MainActivity.this, 
                            "正确! 当前得分: " + score, Toast.LENGTH_SHORT).show();
                        generateLevel(); // 进入下一关
                    } else {
                        // 答错了
                        score = Math.max(0, score - 5); // 最低0分
                        Toast.makeText(MainActivity.this, 
                            "错误! -5分", Toast.LENGTH_SHORT).show();
                        updateUI();
                    }
                }
            });
            
            buttons.add(button);
            gridLayout.addView(button);
        }
        
        updateUI();
    }
    
    /**
     * 更新界面显示
     */
    private void updateUI() {
        tvScore.setText("得分: " + score);
        tvLevel.setText("关卡: " + level);
        tvTime.setText("时间: " + timeLeft + "s");
    }
    
    /**
     * 游戏结束处理
     */
    private void endGame() {
        isPlaying = false;
        
        if (timer != null) {
            timer.cancel();
        }
        
        // 重新启用按钮
        btnStart.setEnabled(true);
        btnLeaderboard.setEnabled(true);
        
        // 保存分数到数据库
        ScoreDatabaseHelper db = new ScoreDatabaseHelper(this);
        db.insertScore(score, level);
        
        // 显示结果
        Toast.makeText(this, 
            "游戏结束!\n最终得分: " + score + "\n到达关卡: " + level, 
            Toast.LENGTH_LONG).show();
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 防止内存泄漏
        if (timer != null) {
            timer.cancel();
        }
    }
}
```

### **代码详解**

| 方法 | 作用 |
|------|------|
| `onCreate()` | Activity生命周期的起点，初始化界面 |
| `initViews()` | 传统的findViewById初始化方式（不使用View Binding） |
| `startGame()` | 重置状态并启动游戏 |
| `generateLevel()` | 核心逻辑：动态生成关卡 |
| `endGame()` | 游戏结束，保存分数 |

> **重要概念**：`findViewById()`是通过ID查找界面组件的传统方法。每个在XML中定义了`android:id`的组件，都可以通过这种方式在Java代码中获取实例。

## 添加数据存储功能

### **创建数据库帮助类**

为了保存排行榜数据，我们需要SQLite数据库：

1. 右键点击`app > java > com.example.colordifferencegame`
2. 选择  **New > Java Class**  ，命名为`ScoreDatabaseHelper`
3. 粘贴以下完整代码：

```java
package com.example.colordifferencegame;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import java.util.ArrayList;
import java.util.List;

/**
 * SQLite数据库帮助类
 * 用于存储和查询游戏成绩
 */
public class ScoreDatabaseHelper extends SQLiteOpenHelper {
    
    // 数据库常量
    private static final String DATABASE_NAME = "color_game.db";
    private static final int DATABASE_VERSION = 1;
    
    // 表和列名定义
    private static final String TABLE_SCORES = "scores";
    private static final String COLUMN_ID = "id";
    private static final String COLUMN_SCORE = "score";
    private static final String COLUMN_LEVEL = "level";
    private static final String COLUMN_DATE = "date";
    
    public ScoreDatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }
    
    /**
     * 首次创建数据库时调用
     */
    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTable = "CREATE TABLE " + TABLE_SCORES + " (" +
                COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                COLUMN_SCORE + " INTEGER, " +
                COLUMN_LEVEL + " INTEGER, " +
                COLUMN_DATE + " DATETIME DEFAULT CURRENT_TIMESTAMP)";
        db.execSQL(createTable);
    }
    
    /**
     * 数据库升级时调用
     */
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_SCORES);
        onCreate(db);
    }
    
    /**
     * 插入新的游戏成绩
     */
    public void insertScore(int score, int level) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COLUMN_SCORE, score);
        values.put(COLUMN_LEVEL, level);
        db.insert(TABLE_SCORES, null, values);
        db.close();
    }
    
    /**
     * 获取排行榜前N名
     */
    public List<Score> getTopScores(int limit) {
        List<Score> scores = new ArrayList<>();
        SQLiteDatabase db = this.getReadableDatabase();
        
        // SQL查询：按分数降序排列，取前limit条
        String query = "SELECT * FROM " + TABLE_SCORES + 
                       " ORDER BY " + COLUMN_SCORE + " DESC LIMIT ?";
        Cursor cursor = db.rawQuery(query, new String[]{String.valueOf(limit)});
        
        // 遍历查询结果
        if (cursor.moveToFirst()) {
            do {
                int id = cursor.getInt(cursor.getColumnIndex(COLUMN_ID));
                int score = cursor.getInt(cursor.getColumnIndex(COLUMN_SCORE));
                int level = cursor.getInt(cursor.getColumnIndex(COLUMN_LEVEL));
                String date = cursor.getString(cursor.getColumnIndex(COLUMN_DATE));
                scores.add(new Score(id, score, level, date));
            } while (cursor.moveToNext());
        }
        
        cursor.close();
        db.close();
        return scores;
    }
    
    /**
     * 分数实体类（嵌套在数据库帮助类中）
     */
    public static class Score {
        public int id, score, level;
        public String date;
        
        public Score(int id, int score, int level, String date) {
            this.id = id;
            this.score = score;
            this.level = level;
            this.date = date;
        }
    }
}
```

### **数据库工作原理**

1. **onCreate()**：第一次运行时创建`scores`表
   - `id`：自增主键
   - `score`：得分
   - `level`：到达关卡
   - `date`：自动记录时间

2. **insertScore()**：插入新记录
   - 使用`ContentValues`包装数据
   - `getWritableDatabase()`获取可写数据库实例

3. **getTopScores()**：查询排行榜
   - `ORDER BY score DESC`按分数降序
   - `LIMIT ?`限制返回数量
   - 使用`Cursor`遍历结果集



## 创建排行榜界面

### **创建布局文件**

1. 右键点击`app > res > layout`
2. 选择 **New > Layout Resource File**
3. 命名为`activity_leaderboard.xml`
4. 粘贴以下内容：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="🏆 排行榜 TOP 50"
        android:textSize="24sp"
        android:textStyle="bold"
        android:gravity="center"
        android:layout_marginBottom="16dp"/>

    <TextView
        android:id="@+id/tvEmpty"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="暂无记录，快去玩游戏吧！"
        android:gravity="center"
        android:visibility="gone"/>

    <ListView
        android:id="@+id/listView"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</LinearLayout>
```

### **创建单项布局**

1. 同样在`layout`文件夹
2. 新建`item_score.xml`
3. 粘贴以下内容：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="12dp"
    android:background="?android:attr/selectableItemBackground">

    <TextView
        android:id="@+id/tvRank"
        android:layout_width="40dp"
        android:layout_height="wrap_content"
        android:text="1"
        android:textSize="18sp"
        android:textStyle="bold"
        android:textColor="#4CAF50"/>

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:orientation="vertical"
        android:layout_marginStart="12dp">

        <TextView
            android:id="@+id/tvScore"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="得分: 100"
            android:textSize="16sp"
            android:textStyle="bold"/>

        <TextView
            android:id="@+id/tvLevel"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="关卡: 5"
            android:textSize="14sp"/>
    </LinearLayout>

    <TextView
        android:id="@+id/tvDate"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="2025-01-01"
        android:textSize="14sp"/>

</LinearLayout>
```

### **创建排行榜Activity**

1. 右键点击`app > java > com.example.colordifferencegame`
2. 选择 **New > Java Class > Activity > Empty Views Activity**
3. 命名为`LeaderboardActivity`
4. **勾选** "Generate a Layout File"
5. 点击 **"Finish"**

Android Studio会自动创建`activity_leaderboard.xml`，但我们已经手动创建了，所以可以删除自动生成的版本。

打开`LeaderboardActivity.java`，用以下代码替换：

```java
package com.example.colordifferencegame;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import java.util.List;

/**
 * 排行榜Activity
 * 显示历史游戏成绩
 */
public class LeaderboardActivity extends AppCompatActivity {
    
    private ListView listView;
    private TextView tvEmpty;
    private ScoreDatabaseHelper dbHelper;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_leaderboard);
        
        // 初始化组件
        listView = findViewById(R.id.listView);
        tvEmpty = findViewById(R.id.tvEmpty);
        
        // 创建数据库实例
        dbHelper = new ScoreDatabaseHelper(this);
        
        // 加载数据
        loadLeaderboard();
    }
    
    /**
     * 加载排行榜数据
     */
    private void loadLeaderboard() {
        // 从数据库获取前50名
        List<ScoreDatabaseHelper.Score> scores = dbHelper.getTopScores(50);
        
        if (scores.isEmpty()) {
            // 没有数据时显示提示
            tvEmpty.setVisibility(android.view.View.VISIBLE);
            listView.setVisibility(android.view.View.GONE);
        } else {
            // 隐藏提示，显示列表
            tvEmpty.setVisibility(android.view.View.GONE);
            listView.setVisibility(android.view.View.VISIBLE);
            
            // 创建自定义适配器
            ArrayAdapter<ScoreDatabaseHelper.Score> adapter = 
                new ArrayAdapter<ScoreDatabaseHelper.Score>(
                    this, 
                    R.layout.item_score, 
                    scores
                ) {
                @Override
                public android.view.View getView(int position, 
                    android.view.View convertView, android.view.ViewGroup parent) {
                    
                    // 复用或创建视图
                    if (convertView == null) {
                        convertView = getLayoutInflater().inflate(
                            R.layout.item_score, parent, false);
                    }
                    
                    // 获取当前项数据
                    ScoreDatabaseHelper.Score score = getItem(position);
                    
                    // 绑定数据到视图
                    TextView tvRank = convertView.findViewById(R.id.tvRank);
                    TextView tvScore = convertView.findViewById(R.id.tvScore);
                    TextView tvLevel = convertView.findViewById(R.id.tvLevel);
                    TextView tvDate = convertView.findViewById(R.id.tvDate);
                    
                    tvRank.setText(String.valueOf(position + 1));
                    tvScore.setText("得分: " + score.score);
                    tvLevel.setText("关卡: " + score.level);
                    // 只显示日期部分（去掉时间）
                    tvDate.setText(score.date.substring(0, 10));
                    
                    return convertView;
                }
            };
            
            listView.setAdapter(adapter);
        }
    }
}
```

### **注册Activity**

打开`app > manifests > AndroidManifest.xml`，在`<application>`标签内添加：

```xml
<activity 
    android:name=".LeaderboardActivity"
    android:label="排行榜"/>
```

确保最终文件看起来像这样：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.colordifferencegame">
    
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="找色差游戏"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light">
        
        <activity 
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
        <activity 
            android:name=".LeaderboardActivity"
            android:label="排行榜"/>
    </application>
</manifest>
```



## 运行和测试你的游戏

### **运行应用**

1. 点击  **"Run"**  按钮（或按Shift+F10）
2. 等待应用编译和部署
3. 你应该看到游戏主界面！

### **测试各项功能**

| 测试场景 | 预期结果 |
|----------|----------|
| 点击"开始游戏" | 出现2×2色块网格，倒计时开始 |
| 点击正确色块 | 得分增加，进入下一关 |
| 点击错误色块 | 扣5分，出现Toast提示 |
| 60秒后 | 游戏结束，分数保存 |
| 点击"排行榜" | 显示历史成绩（首次为空） |
| 再次玩游戏 | 新分数添加到排行榜 |

### **常见问题排查**

**问题**：应用崩溃，提示"NullPointerException"
- **解决**：检查`findViewById`的ID是否与XML中的`android:id`完全一致

**问题**：色块不显示或布局错乱
- **解决**：确认`GridLayout.LayoutParams`设置正确，尤其是`weight`参数

**问题**：排行榜点击无反应
- **解决**：检查`AndroidManifest.xml`中是否注册了`LeaderboardActivity`


## 小结

### **你学到的技能**

恭喜你！通过本教程，你已经掌握了：

✅ **Android基础**
- 创建项目和配置依赖
- 使用XML设计用户界面
- 在Java中控制界面元素

✅ **核心组件**
- `Activity`生命周期
- `findViewById`的使用
- `Intent`界面跳转

✅ **游戏开发**
- 随机数生成和算法设计
- 倒计时器实现
- 点击事件处理

✅ **数据持久化**
- SQLite数据库创建和操作
- 数据查询和展示
- 自定义ListView适配器

### **进一步优化建议**

想让游戏更完美？可以尝试：

1. **添加难度选择**：在开始前让玩家选择初级/中级/高级
2. **音效反馈**：答对/答错时播放不同音效
3. **动画效果**：色块出现和消失的动画
4. **分享功能**：将高分截图分享到社交媒体
5. **主题切换**：支持深色/浅色模式

### **最终成果**

你现在拥有一个功能完整的Android游戏应用，包含：
- 智能难度递增的游戏机制
- 本地数据存储的排行榜
- 清晰的Material Design界面
- 60秒紧张刺激的挑战

## 进阶

![找色差游戏]({{ "/assets/images/color-difference-game-2.gif" | relative_url }})

- 游戏界面是正方形
    - 把GridLayout替换成LinearLayout，gravity设置为center
    - 里面再嵌套一个自定义SquareGridLayout，继承GridLayout，重写onMeasure方法，设置宽度等于高度
- 游戏色块是圆形
    - GradientDrawable对象，设置shape为oval，设置颜色
    - 把GradientDrawable对象设置为Button的背景

```java
// 自定义SquareGridLayout类
public class SquareGridLayout extends GridLayout {
    public SquareGridLayout(Context context) {
        super(context);
    }
    
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        int width = getMeasuredWidth();
        setMeasuredDimension(width, width);
    }
}
// GradientDrawable对象，设置shape为oval，设置颜色
GradientDrawable drawable = new GradientDrawable();
drawable.setShape(GradientDrawable.OVAL);
drawable.setColor(color);

// 把GradientDrawable对象设置为Button的背景
button.setBackgroundDrawable(drawable);
```


## 参考

- [找色差游戏](https://www.zhaosecha.com/)
