import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
  

function ArtisanCard(props) {
    const workToJobName = {
        Chauffage: {job: "Chauffagiste", icon: "🔥"},
        CloisonnementPlâtrage: {job: "Plaquiste", icon: "📏"},
        Démolition: { job: "Maçon", icon: "💣"},
        Électricité: {job: "Electricien", icon: "⚡"},
        Étanchéité: {job: "Etancheur", icon:"☔" },
        Façade: {job: "Façadier", icon: "🏢"},
        Fondations: {job: "Maçon", icon: "🏗️"},
        InstallationCuisineSDB: {job: "Installateur", icon:  "🚰"},
        Isolation: {job: "Plaquiste", icon: "📏"},
        Maçonnerie: { job: "Maçon", icon:"🧱"},
        Menuiserie: { job: "Menuisier", icon: "🪚"},
        MontageDeMeuble: {job: "Installateur", icon: "🪑"},
        Peinture: {job: "Peintre", icon: "🎨"},
        Plomberie: { job: "Plombier", icon : "💧" },
        RevêtementsMuraux : { job: "peintre", icon : "🖼️"},
        RevêtementsSol: { job: "Carreleur", icon : "🦶🏾"},
        RevêtementsExtérieurs: { job: "Façadier", icon : "🏡"},
        Toiture: { job: "Couvreur", icon: "🛠️"},
        Ventilation: { job: "Couvreur", icon: "🌬️"},
    }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.companyName}>{props.name}</Text>
      </View>
      <View>
        <Text style={styles.fieldName}>{workToJobName[props.field].job}</Text>
      </View>
      <View>
        <Text style={styles.icon}>{workToJobName[props.field].icon}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={props.onPress}>
          <Image source={props.image} style={styles.avatarPicture}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ArtisanCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 15,
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    width: 128,
    height: 125,
    left: 44,
    top: 404,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  companyName: {
    width: 84,
    height: 19,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 19,
    alignItems: "center",
    textAlign: "center",
    letterSpacing: 0.5,
    color: "#6F797B",
    order: 0,
    flexGrow: 0,
  },
  avatarPicture: {
    width: 68,
    height: 64.73,
    order: 1,
    flexGrow: 0,
  },

  icon: {
    height:20,
    width:20,
    marginTop:10,
  },
});
