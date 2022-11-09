import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  Text,
  Animated,
  Button,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
const bg = ['red', 'blue', 'yellow'];
const data = [
  {
    image:
      'https://static1.srcdn.com/wordpress/wp-content/uploads/2019/01/klaus4.jpg',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image: 'https://cdn.mos.cms.futurecdn.net/jjetfBZx53f8CC6uxQEqMn.jpg',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image:
      'https://filmdaily.co/wp-content/uploads/2021/06/klaus-lede-1300x731.jpeg',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image:
      'https://www.cheatsheet.com/wp-content/uploads/2021/03/Klaus-Mikaelson.png?w=1024&h=708',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image: 'https://i.ytimg.com/vi/fZdzhUfX6Ro/maxresdefault.jpg',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image:
      'https://filmdaily.co/wp-content/uploads/2021/06/klaus-lede-1300x731.jpeg',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image:
      'https://www.cheatsheet.com/wp-content/uploads/2021/03/Klaus-Mikaelson.png?w=1024&h=708',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image: 'https://i.ytimg.com/vi/fZdzhUfX6Ro/maxresdefault.jpg',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
  {
    image:
      'https://filmdaily.co/wp-content/uploads/2021/06/klaus-lede-1300x731.jpeg',
    title: 'Kalus Mikalson',
    description:
      'this is the new descriotin for the originals in the newtyokle please read carefuly the whole article',
  },
];

const FlatlistScreen = props => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [selectedIndex, setSelectIndex] = useState(0);

  useEffect(() => {
    flatListRef?.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
    });
  }, [selectedIndex]);

  const Indicator = ({scrollX}) => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: 'grey',
                margin: 6,
                transform: [
                  {
                    scale: scale,
                  },
                ],
              }}
            />
          );
        })}
      </View>
    );
  };

  const Backdrop = ({scrollX}) => {
    const bgColor = scrollX.interpolate({
      inputRange: bg.map((_, i) => i * width),
      outputRange: bg.map(bgc => bgc),
    });
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: bgColor,
          },
        ]}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar hidden />
      <View style={styles.safe}>
        <Backdrop scrollX={scrollX} />
        <Button title="back" onPress={() => props.navigation.goBack()} />
        <Animated.FlatList
          data={data}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          horizontal
          initialScrollIndex={selectedIndex}
          pagingEnabled
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={{width, alignItems: 'center', padding: 20}}>
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: width / 2, height: width / 2}}
                  />
                </View>
                <Button
                  title="left"
                  onPress={() => {
                    let mainIndex = (
                      (parseInt(JSON.stringify(scrollX)) - parseInt(width)) /
                      parseInt(width)
                    ).toFixed(0);
                    console.log('Left', mainIndex);

                    if (mainIndex <= 0) {
                      setSelectIndex(0);
                      return;
                    } else {
                      setSelectIndex(parseInt(mainIndex));
                    }
                  }}
                />

                <Button
                  title="right"
                  onPress={() => {
                    let mainindex = (
                      (parseInt(JSON.stringify(scrollX)) + parseInt(width)) /
                      parseInt(width)
                    ).toFixed(0);

                    console.log('Right', mainindex);

                    if (data?.length <= mainindex) {
                      return;
                    }
                    setSelectIndex(parseInt(mainindex));
                  }}
                />
                <View style={{flex: 0.3}}>
                  <Text
                    style={{fontWeight: '800', color: 'white', fontSize: 16}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{fontWeight: '300', fontSize: 12, marginTop: 10}}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default FlatlistScreen;
