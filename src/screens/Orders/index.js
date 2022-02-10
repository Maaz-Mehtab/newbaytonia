import * as React from 'react';
import {View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/Text';
import Icon from '../../helpers/Icons';
import {Colors, Metrics} from '../../themes';
import styles from './styles';

import {StringConstants} from '../../helpers/stringConstant';
import {ScrollView} from 'react-native-gesture-handler';
function Order(props) {
  const {params} = props?.route;
  const {data, title, type} = params;

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.navigation.navigate('Detail', {id: item.id})}
        key={index}
        style={styles.boxView}>
        <View style={styles.boxHeaderView}>
          <Text size={'medium'} style={styles.headerText} type={'heading'}>
            #{item.pickingId}
          </Text>
          {type == 1 && (
            <View
              style={{
                backgroundColor: Colors.white,
                padding: Metrics.ratio(5),
                marginHorizontal: Metrics.ratio(10),
                borderRadius: 4,
              }}>
              <Text style={{color: Colors.themeColor}}>
                {StringConstants.ReturnOrder}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.itemView}>
          <Text size={'xSmall'}>
            {StringConstants.OrderNameLabelPrefix} {item?.saleOrderId}
          </Text>
        </View>

        <View style={styles.itemView}>
          <Text size={'xSmall'}>
            {StringConstants.OrderDatePrefix} {item?.assignedDate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const emptyItem = () => {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{textTransform: 'capitalize', fontSize: Metrics.ratio(14)}}>
          No Order Found{' '}
        </Text>
      </View>
    );
  };
  return (
    <LinearGradient colors={['#f2f2f2', '#f2f2f2']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: Metrics.ratio(25),
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: Metrics.ratio(18),
              textTransform: 'capitalize',
              color: Colors.themeColor,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
        </View>
        <ScrollView>
          <View style={{marginTop: 20}}>
            <View style={{paddingBottom: 10}}>
              <FlatList
                data={data}
                renderItem={renderItem}
                ListEmptyComponent={emptyItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Order;
