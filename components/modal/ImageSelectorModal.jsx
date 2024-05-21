import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const images = [
  require('../../assets/avatar/Alban.png'),
  require('../../assets/avatar/Andrea.png'),
  require('../../assets/avatar/Apu.png'),
  require('../../assets/avatar/Cedric.png'),
  require('../../assets/avatar/Ella.png'),
  require('../../assets/avatar/Gael.png'),
  require('../../assets/avatar/JeanPierre.png'),
  require('../../assets/avatar/Martin.png'),
  require('../../assets/avatar/Melanie.png'),
  require('../../assets/avatar/Nathan.png'),
  require('../../assets/avatar/Paulette.png'),
  require('../../assets/avatar/Roger.png'),
];

function ImageSelectorModal({ isShow, toggleModal, onSelectImage }) {
  const { colors } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const styles = createStyles(colors);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    if (selectedImage !== null) {
      onSelectImage(images[selectedImage]); 
    }
    toggleModal();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isShow}
      onRequestClose={handleCloseModal}
    >
      <Pressable style={styles.modalContainer} onPress={handleCloseModal}>
        <View style={styles.modal}>
          <View style={styles.textLine}>
            <Text style={styles.text}>Choisissez une image</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome name="times" size={40} color={'#6F797B'} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.imageGrid}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImageSelect(index)}
                style={[
                  styles.imageWrapper,
                  selectedImage === index && { borderColor: colors.lightGreen, borderWidth: 2 }
                ]}
              >
                <Image source={image} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}

export default ImageSelectorModal;

const createStyles = (colors) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '90%',
    backgroundColor: colors.modalBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingBottom: 20,
  },
  textLine: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 24,
    paddingLeft: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: '#194852',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageWrapper: {
    margin: 10,
    padding: 5,
  },
  image: {
    width: 80,
    height: 80,
  },
});
