import { mapState } from "vuex"
export default {
  computed: {
    ...mapState({
      imageType: (state) => state.fileType.image,
      filesType: (state) => state.fileType.files,
      videoPath: (state) => state.fileType.video,
      excelPath: (state) => state.fileType.xls,
      pdfType: (state) => state.fileType.pdf,
      docType: (state) => state.fileType.doc,
    }),
  },
  methods: {
    // File handle
    getPathFromName(_str) {
      try {
        if (!_str || !_str.includes(".")) {
          return "unknow"
        }
        return _str.split(".").pop()
      } catch (error) {
        console.log(error)
        return "unknow"
      }
    },
    getTypeFromPath(_str) {
      if (!_str || _str === "unknow") {
        return "unknow"
      }
      if (this.imageType.includes(_str)) {
        return "image"
      }
      if (this.videoPath.includes(_str)) {
        return "video"
      }
      if (this.pdfType.includes(_str)) {
        return "otherFilePdf"
      }
      if (this.docType.includes(_str)) {
        return "otherFileDoc"
      }
      if (this.excelPath.includes(_str)) {
        return "otherFileXls"
      }
      return "otherFile"
    },
    // fileSizeFromURL(URL){
    //   const fileEntry = new FileReader()
    //   fileEntry.getMetadata(function(metadata){console.log(metadata.size)})
    // }
    // getIconicFromFile(_str) {
    //   switch (_str) {
    //     case "image":
    //       return image1
    //     case "video":
    //       return image2
    //     case "otherFilePdf":
    //       return otherFilePdf
    //     case "otherFileXls":
    //       return otherFileXls
    //     case "otherFileDoc":
    //       return otherFileDoc
    //     default:
    //       return otherFileDoc
    //   }
    //   // return _str;
    // },
  },
}
