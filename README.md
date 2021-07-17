# simless
实现一个简单、模拟css预处理器less的练手小项目。

## 功能介绍

嵌套
+   以&符号引用父选择器

@符号开头定义和使用变量  
+   普通变量

注释
+ 单行注释
+ 多行注释


## 例子

```javascript

 @color: #f0f;
 /* 单行注释 */
 .a {
     color: #000;
     &.link {
         color: @color;
     }
     /**
      * 多行注释 
      */
     & .test {
         color: @color;
     }
     &:hover {
         color: red;
     }
     border: 1px solid @color;
 }
```

经过转化后变成
```javascript
  .a {
      color: #000;
      border: 1px solid  #f0f;
   }
    .a.link {
      color:  #f0f;
   }
        /**
         * 多行注释 
         */
    .a .test {
      color:  #f0f;
   }
    .a:hover {
      color: red;
   }
```

## 运行

npm install 安装依赖项。

npm start 启动。


