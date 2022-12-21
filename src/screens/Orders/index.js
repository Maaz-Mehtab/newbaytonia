import React, {useState} from 'react';
import {View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from '../../components/Text';
import Icon from '../../helpers/Icons';
import {Colors, Metrics} from '../../themes';
import styles from './styles';

import {StringConstants} from '../../helpers/stringConstant';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import home from '../../store/action/home';
import Icons from '../../helpers/Icons';
function Order(props) {
  const dispatch = useDispatch();

  const {params} = props?.route;
  const {data, title, type, orderType} = params;
  const [selectedCheck, setSelectedCheck] = useState([]);
  const [flag, setFlag] = useState(false);
  const [checkBox, setCheckBox] = useState(orderType === 0 ? true : false);
  useFocusEffect(() => {
    clearOrderDetail();
  }, [params]);

  const clearOrderDetail = () => {
    dispatch(home.resetOrderDetail());
  };

  const onItemSelect = orderId => {
    let temp = selectedCheck;
    if (temp.length > 0 && temp.includes(orderId)) {
      let selectedIndex = temp.findIndex(a => a == orderId);
      temp.splice(selectedIndex, 1);
    } else {
      temp.push(orderId);
    }
    setSelectedCheck(temp);
    setFlag(!flag);
  };

  const selectAll = () => {
    setSelectedCheck([]);
    let temp = data.map(a => a.id);
    setSelectedCheck(temp);
    setFlag(!flag);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          props.navigation.navigate('Detail', {id: item?.id, item: item})
        }
        key={index}
        style={styles.boxView}>
        <View style={styles.boxHeaderView}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {checkBox && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onItemSelect(item?.id)}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <Icons.MaterialCommunityIcons
                  name={
                    selectedCheck?.includes(item?.id)
                      ? 'checkbox-outline'
                      : 'checkbox-blank-outline'
                  }
                  color={Colors.themeColor}
                  size={24}
                />
              </TouchableOpacity>
            )}
            <Text size={'medium'} style={styles.headerText} type={'heading'}>
              #{item?.name}
            </Text>
          </View>
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
        {/* {checkBox && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.acceptOrderBtn}
                activeOpacity={1}
                onPress={selectAll}>
                <Text style={styles.selectAllBtnText}>Accept Orders</Text>
                <Text
                  style={
                    styles.compareText
                  }>{`${selectedCheck.length} /${data.length}`}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.selectAllBtnView}
                activeOpacity={1}
                onPress={selectAll}>
                <Text style={styles.selectAllBtnText}>Select All</Text>
              </TouchableOpacity>
              <Icons.MaterialCommunityIcons
                name={
                  selectedCheck.length == data.length
                    ? 'checkbox-outline'
                    : 'checkbox-blank-outline'
                }
                color={Colors.themeColor}
                size={24}
              />
            </View>
          </View>
        )} */}

        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: checkBox ? 80 : 0}}>
          <View style={{marginTop: 0}}>
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
        {checkBox && (
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetButtonView}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={selectAll}
                style={{width: '30%', flexDirection: 'row'}}>
                <Text style={styles.selectAllBtnText}>Select All</Text>
                <Icons.MaterialCommunityIcons
                  name={
                    selectedCheck.length == data.length
                      ? 'checkbox-outline'
                      : 'checkbox-blank-outline'
                  }
                  color={Colors.themeColor}
                  size={24}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.acceptOrderBtn}>
                <Text style={styles.acceptOrderBtnText}>Accept Orders</Text>
                <Text
                  style={
                    styles.compareText
                  }>{`${selectedCheck.length} /${data.length}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Order;
