module Data.Model exposing (..)

import Material

type alias Model =
    { count : Int
    , caption: String
    , subval: {
        caption: String
    }
    , mdl :
        Material.Model
    }
