<div class="ts3-vrk-widget">
  <div class="ts3-title" >
    <span>{name}</span>
  </div>
  <span class="small">({address})</span>

  <div class="ts3-online-clients" style="padding-top:5px;">
    <div>
      <span class="badge">
        <!-- {{ts3-online-clients}} -->
      </span> Users Online:
    </div>
    <div style="padding-top:10px">
      <a class="ts3-join-info btn btn-primary" role="button" href="ts3server://{address}" style="width:100%;">
        <div class="ts3-join-server">
          join server
        </div>
      </a>
    </div>

    <div class="ts3-online-users" style="padding-top: 10px;">
      <ul class="list-group text-right">
        <!-- {{ts3-online-users}} -->
      </ul>
    </div>
  </div>
</div>
